(function() {
    'use strict';

    angular
        .module('shared')
        .factory('skillDataService', service);

	/** @ngInject */
    function service(firebaseService, $log, Skill, $q, SearchUser, SearchSkill) {
        
       return {
            users: users,
            create:create,
            remove:remove,
            join: join,
            search: search
       }
       /**
        * Lista de usuários que possuem determinada habilidade
        *
        * @param {Array<string>} key chaves para busca de competencias. a busca vai procurar pelos usuarios que 
        * possuem uma palava parcial OU outra palavra parcial. Ele usa like "%palava%"
        * @return {Array<SearchUser>}
        */
       function users(keys){
        
            if( !keys ) return [];
            var ret = [];
            var idNameHash = {};
            var hashUser = {};

            return firebaseService.database().ref('/skills').once('value').then(function(snapshot){
                var data = snapshot.val();
                if( !data ) return [];
                for (var skillId in data) {
                    if (data.hasOwnProperty(skillId)) {
                        for( var i = 0; i < keys.length; i++){
                            if( data[skillId].name.toLowerCase().indexOf(keys[i].toLowerCase()) >=0 ){
                                idNameHash[skillId] = data[skillId].name; 
                            }
                        }                        
                    }
                }
                var promisses = []
                for (var skillId in idNameHash) {
                    if (idNameHash.hasOwnProperty(skillId)) {                        
                         promisses.push(
                            firebaseService.database().ref('/search-index/' + skillId )
                            .once('value').then(function(s){
                                var r =  s.val();
                                if( !r ) return null;
                                r.key = s.key;
                                return r;
                            })
                        );
                    }
                }
                if( promisses.length == 0 ) return [];
                return $q.all(promisses).then(function(values){
                    for (var i = 0; i < values.length; i++) {
                        var data = values[i];
                        for (var key in data) {
                            if (data.hasOwnProperty(key)) {
                                if( key == "key") continue;
                                var obj = data[key];
                                var email = firebaseService.decodeFromPath(key);                                
                                if( !hashUser[email] ) hashUser[email] = new SearchUser(obj.name, email);
                                hashUser[email].addSearchSkills(new SearchSkill(idNameHash[data.key], data.key, obj.experienceCount, obj.projectCount, obj.level));                                
                            }
                        }                     
                    }
                    for (var mail in hashUser) {
                        if (hashUser.hasOwnProperty(mail)) {
                            ret.push(hashUser[mail])
                        }
                    }
                    return ret;
                    
                });

            });
       }

    /**
     * Retorna lista de competencias que possuem no nome determinado valor.
     * 
     * @param {string} name pedaço do nome desejado
     * @return {Array<Skill>} array de competencias, ou vazio caso o nome seja inválido
     */
       function search(name){
            if( !name ){
                var deferred = $q.defer();
                deferred.resolve([]);
                return deferred.promise;
            }
            return firebaseService.database().ref('/skills').once('value').then(function(snapshot){
                var ret = [];
                var data = snapshot.val();
                if( !data ) return [];
                for (var skillId in data) {
                    if(  data[skillId].name.toLowerCase().indexOf(name.toLowerCase()) >=0 && data.hasOwnProperty(skillId)){
                        data[skillId].id = skillId;
                        ret.push(Skill.buildFromServer(data[skillId]));
                    }                    
                }
                return ret;
            });
       }

       /**
        * Cria uma habilidade nova
        *
        * @param {Skill} skill 
        */
       function create(skill){
            if (!skill || !(skill instanceof Skill) ) throw "Skill.create: Illegal Argument exception"
            $log.info("create skill");
            if( !skill ) throw "skill is required"
            var updates = {};    
            updates['skills/' + skill.getId()]  = {
                name: skill.getName(),
                validated : skill.getValidated(),
                description: skill.getDescription()
            }
            return firebaseService.database().ref().update(updates);
       }

       /**
        * Remove uma habilidade
        *
        * @param {Skill} skill 
        */
       function remove(skill){
           if (!skill || !(skill instanceof Skill) ) throw "Skill.create: Illegal Argument exception"
            $log.info("remove skill");
       }

       /**
        * Junta duas ou mais habilitades em uma e atualiza os usuários 
        * que as possuem       
        *
        * @param {Array<Skill>} skills lista de habilitades
        */
       function join(skills){
            $log.info("join skill");
       }
    }


})();
