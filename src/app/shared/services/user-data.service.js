(function () {
    'use strict';

    angular
        .module('shared')
        .factory('userDataService', service);

    /** @ngInject */
    function service(firebaseService, $log, User, $q, Experience, Project, SkillUser, Skill) {

        return {
            get: get,
            create: create,
            update: update
        }

        /**
         * Obtem um usuário pelo seu login
         *
         * @param {string} login do usuário a ser encontrado
         */
        function get(email) {
            var deferred = $q.defer();
            var userId = firebaseService.encodeToPath(email);
            var hashSkill = {};
            var promissesSkill = [];

            var errorHandler = function (error) {
                deferred.reject(error);
            };            
            firebaseService.database().ref('/users/' + userId).once('value')
                .then(function (snapshot) {
                    var data = snapshot.val();
                    data.email = email;
                    var user = User.buildFromServer(data);

                    if( data.skills ) {
                        for (var property in data.skills) {
                            user.$databaseSkills = data.skills;
                            if (data.skills.hasOwnProperty(property)) {
                                if( !hashSkill[property] ) {
                                    promissesSkill.push(firebaseService.database().ref('/skills/' + property).once('value'));
                                    hashSkill[property] = [];
                                } 
                                 hashSkill[property].push ({
                                     level: data.skills[property],
                                     item: user
                                 });
                            }
                        }   
                    }  

                    //Obtem as experiencias 
                    firebaseService.database().ref('/experiences/' + userId).once('value')
                        .then(function (snapshot2) {
                            var experiences = snapshot2.val();
                            var promisses = [];
                            var expProjecHash = {};

                            for (var property in experiences) {
                                if (!experiences.hasOwnProperty(property)) {
                                    continue;
                                }
                                var _exp = experiences[property];
                                _exp.id = property;
                                
                                var experience = Experience.buildFromServer(_exp);

                                if( _exp.project) {
                                    if (!expProjecHash[_exp.project]) {
                                        promisses.push(firebaseService.database().ref('/projects/' + _exp.project).once('value'));
                                        expProjecHash[_exp.project] = [];
                                    }
                                    expProjecHash[_exp.project].push(experience);
                                }

                                if( _exp.skills ){
                                    for (var skillId in _exp.skills) {
                                        if (_exp.skills.hasOwnProperty(skillId)) {
                                            if( !hashSkill[skillId] ) {
                                                promissesSkill.push(firebaseService.database().ref('/skills/' + skillId).once('value'));
                                                hashSkill[skillId] = [];
                                            }
                                             hashSkill[skillId].push ({
                                                level: _exp.skills[skillId],
                                                item: experience
                                            }) 
                                        }                                        
                                    }   
                                }                               
                                user.addExperience(experience);
                            }

                            var loadSkills = function(){
                                if( promissesSkill.length == 0) {
                                    deferred.resolve(user);
                                }
                                else{
                                    $q.all(promissesSkill).then(function (values) {
                                        for (var i = 0; i < values.length; i++) {
                                            if( !values[i]) continue;
                                            var data = values[i].val();
                                            if( !data) continue;
                                            data.id = values[i].key;
                                            
                                            for (var k = 0; k < hashSkill[data.id].length; k++) {
                                                var item = hashSkill[data.id][k];
                                                var skill = Skill.buildFromServer(data)
                                                if( item.level) skill = new SkillUser(skill, item.level);
                                                item.item.addSkill(skill);                                    
                                            }
                                        }
                                        deferred.resolve(user);                                        
                                    })
                                }
                                 
                            };

                            if (promisses.length != 0) {
                                $q.all(promisses).then(function (values) {
                                    for (var i = 0; i < values.length; i++) {
                                        var data = values[i].val();
                                        data.id = values[i].key;
                                        var project = Project.buildFromServer(data);
                                         for (var property in data.skills) {
                                            if (data.skills.hasOwnProperty(property)) {
                                                if( !hashSkill[property] ) {
                                                    promissesSkill.push(firebaseService.database().ref('/skills/' + property).once('value'));
                                                    hashSkill[property] = [];
                                                } 
                                                hashSkill[property].push ({
                                                    item: project
                                                })
                                            }
                                         }
                                         for (var k = 0; k < expProjecHash[data.id].length; k++) {
                                             var exp = expProjecHash[data.id][k];
                                             exp.setProject(project);                                             
                                         }
                                    }
                                    loadSkills();                                       
                                }).catch(errorHandler);
                            }
                            else{
                                loadSkills();
                            }
                        }, errorHandler);
                }, errorHandler);

            return deferred.promise;
        }
        
        /**
         * Usuário a ser criado
         *
         * @param {User} user Usuário para ser criado no firebase
         */
        function create(user) {
            if (!user ||  !(user instanceof User) ) throw "User.update: Illegal Argument exception"
            $log.info("creating user");
            return _save(user);
        }

        /**
         * Usuário a ser atualizado
         *
         * @param {User} user Usuário para ser atualizado no firebase
         */
        function update(user) {
            if (!user || !(user instanceof User) ) throw "User.update: Illegal Argument exception"
            $log.info("updating user");
            return _save(user);
        }

        /****************************************************************
        * Métodos privados
        *****************************************************************/

        
        function _save(user) {
            //https://firebase.googleblog.com/2015/09/introducing-multi-location-updates-and_86.html       
            $log.debug("create user");
            var updates = {};
           
            var userId = firebaseService.encodeToPath(user.getId());
            var toSend = _buildFirebaseObject(user);
            updates['users/' + userId] = toSend.user;
            for (var i = 0; i < toSend.skillsToRemove.length; i++) {
                var toRemove = toSend.skillsToRemove[i];
                updates['search-index/' + toRemove + "/" + userId] = null;                
            }
            for (var skillId in toSend.skillsToAdd) {
                if (toSend.skillsToAdd.hasOwnProperty(skillId)) {
                    updates['search-index/' + skillId + "/" + userId] = toSend.skillsToAdd[skillId];                    
                }
            }
            updates['experiences/' + userId]  = toSend.experiences;
            return firebaseService.database().ref().update(updates);
        }


        function _buildFirebaseObject(user) {

            var toSend = {
                user: {},
                skillsToRemove: [],
                skillsToAdd: {},
                experiences: {}         
            };
            toSend.user.name = user.getName();
            if (user.getLinkedIn()) toSend.userlinkedIn = user.getLinkedIn();
            if (user.getLattes())  toSend.user.lattes = user.getLattes();

            var skills = user.getSkills();
            if( skills.length > 0 ){
                toSend.user.skills = {};
                for (var i = 0; i < skills.length; i++) {
                    var skill = skills[i];
                    toSend.user.skills[skill.getId()] = skill.getLevel();                    
                    toSend.skillsToAdd[skill.getId()] = {
                        level: skill.getLevel(),
                        experienceCount: skill.getExperienceCount(),
                        projectCount: skill.getProjectCount(),
                        name: user.getName()
                    }
                }
            }
            if( user.$databaseSkills ) {
                for (var skillId in user.$databaseSkills) {
                    if (user.$databaseSkills.hasOwnProperty(skillId)) {                       
                        toSend.skillsToRemove.push(skillId);
                    }
                }
            }
            var experiences = user.getExperiences();
            if( experiences.length > 0 ){
                for (var i = 0; i < experiences.length; i++) {
                    var item = experiences[i];
                    var _exp  = {};    
                    if( item.getDescription() ) _exp.description = item.getDescription();
                    if( item.getTitle() ) _exp.title = item.getTitle();
                    if( item.getStartDate() ) _exp.startDate = item.getStartDate();
                    if( item.getEndDate() ) _exp.endDate = item.getEndDate();
                    if( item.getProject()) _exp.project = item.getProject().getId();                    
                    var expSkills = item.getSkills();
                    if( expSkills.length > 0 ){
                        _exp.skills = {};
                        for (var k = 0; k < expSkills.length; k++) {
                            _exp.skills[expSkills[k].getId()] = expSkills[k].getLevel();
                        }
                    }
                    toSend.experiences[item.getId()] = _exp;
                }                                
            }
            return toSend;
        }
    }


})();
