(function() {
    'use strict';

    angular
        .module('shared')
        .factory('User', factory)

	/** @ngInject */
    function factory(SkillUser, Skill, ModelHelper, Experience) {
        
        //construtor
        function User(email) {
            if( !email ) { throw "User contructor: email is required"; }
            this._email = email;
            this._skills = [];
            this._experiences = [];
            this.$skills = [];
            var self = this;
            this.$skillObservers = function(){
                rebuildSkill(self);
            }
        }
        /**
         * Retorna o identificador desse usuário. 
         * @return identificador do usuário. 
         */
        User.prototype.getId = function(){
            return this._email;
        }

        User.prototype.getEmail = function(){ return this._email; }
        User.prototype.setEmail = function(email){ 
            if( !email) throw 'User.setEmail: illegal argument exception';
            this._email = email; 
        }

        User.prototype.getName = function(){ return this._name; }
        User.prototype.setName = function(name){ 
            if( !name) throw 'User.setName: illegal argument exception';
            this._name = name; 
        }

        User.prototype.getLattes = function(){ return this._lattes; }
        User.prototype.setLattes = function(value){ this._lattes = value; }

        User.prototype.getLinkedIn = function(){ return this._linkedIn;}
        User.prototype.setLinkedIn = function(linkedIn){ this._linkedIn = linkedIn; }

        
        /**
         * Retorna as competencias desse usuário. O retorno sera um array com objetos
         * do tipo SkillUser
         * @return {Array<SkillUser>} array com as experiencias do usuario
         */
        User.prototype.getSkills = function(){ 
            return this.$skills;           
        }
        
        /**
         * Obtem a primeira competência com determinado nome
         * @param {string} name nome da competencia a ser obtida
         * @return {SkillUser} competencia que casa com o nome ou null caso nao tenha encontrado
         */
        User.prototype.getSkillByName = function(name){
            if( !name ) return null; 
            var skills = this.getSkills();
            for (var i = 0; i < skills.length; i++) {
                var skill = skills[i];
                if( skill.getName().toLowerCase().indexOf(name) >= 0 ) return skill;                
            }
            return null;
        }
        
        /**
         * Adiciona uma competencia ao usuario. Se existir uma competencia 
         * igual, a anterior é removida e a nova é adicionada
         * 
         * @param {SkillUser} skill competencia com seu nivel
         */
        User.prototype.addSkill = function(skill){ 
            if (!(skill instanceof SkillUser)) throw "User.addSkill: Illegal Argument exception"
            this.removeSkill(skill)
            var ret =  this._skills.push(skill); 
            rebuildSkill(this);
            return ret;
        }

        /**
         * Remove uma competencia do usuario. 
         * 
         * ATENCAO: Ao remover a competencia, sera removidas todas as ligações com as  experiencias 
         * do usuário naquela competencia. 
         * 
         * @param {SkillUser | Skill} skill competencia com seu nivel
         */
        User.prototype.removeSkill = function(skill){
            if (!(skill instanceof Skill) && !(skill instanceof SkillUser)) throw "User.removeSkill: Illegal Argument exception"
            ModelHelper.removeItemById(skill, this._skills); 
            for( var i = 0; i < this._experiences.length; i++ ) {
                var exp = this._experiences[i];
                ModelHelper.removeItemById(skill, exp.getSkills());                
            } 
            rebuildSkill(this);
        }
        /**
         * Remove uma competencia pelo nome 
         * @param {string} skillName nome da competencia
         */
        User.prototype.removeSkillByName = function(skillName){
            this.removeSkill(this.getSkillByName(skillName), this._skills);  
        }
        /**
         * @return {Array<Experiences>}
         */
        User.prototype.getExperiences = function() { return this._experiences };

         /**
         * Adiciona uma experiencia ao usuario. Se existir uma experiencia 
         * igual, a anterior é removida e a nova é adicionada
         * 
         * @param {Experience} experience experiencia com seu nivel
         */
        User.prototype.addExperience = function(experience){ 
            if (!(experience instanceof Experience) ) throw "User.addExperience: Illegal Argument exception"
            if( experience ) {
                this.removeExperience(experience);
                this._experiences.push(experience);
                experience.subscribe(this.$skillObservers);
                rebuildSkill(this);
            }            
        }

        /**
         * Remove uma experiencia do usuario. 
         * 
         * @param {Experience} experience experiencia a ser removida
         */
        User.prototype.removeExperience = function(experience){
            if (!(experience instanceof Experience) ) throw "User.removeExperience: Illegal Argument exception"
            if( experience ) {
                var exp = ModelHelper.removeItemById(experience, this._experiences);  
                if( exp ) exp.unsubscribe(this.$skillObservers);
            }
            rebuildSkill(this);
        }

        /**
         * Constrói um objeto skill com o dado vindo do servidor. 
         * ATENCAO: Este é um método estático
         * 
         * @param {Object} data dado vindo do servidor sem manipulação nenhuma
         */
        User.buildFromServer = function (data) {
            var user = new User(data.email);
            user.setName(data.name);
            if(data.linkedIn) user.setLinkedIn(data.linkedIn);            
            if(data.lattes) user.setLattes(data.lattes);                      
            return user;        
        };        

        //private funcition
        function rebuildSkill(self){
            var hash = {};
            var hashProject = {};
            self.$skills.splice(0, self.$skills.length);

            var _hashSkill = function (skillUser){
                var actualSkill = hash[skillUser.getId()];
                if( !actualSkill ){
                    //reconstroi para nao ficar alterando a referencia dentro da experiencia
                    actualSkill = new SkillUser(skillUser.getSkill(), skillUser.getLevel());
                    hash[skillUser.getId()] = actualSkill;
                }
                else if( actualSkill.getLevel() < skillUser.getLevel()) {
                    actualSkill.setLevel(skillUser.getLevel());
                }
                return actualSkill;
            }

            for( var i = 0; i < self._experiences.length; i++ ) {
                var exp = self._experiences[i];
                for( var k = 0; k < exp.getSkills().length; k++ ){
                    var expSkill = exp.getSkills()[k];
                    var actualSkill = _hashSkill(expSkill)
                    actualSkill.increaseExperienceCount();
                    if( exp.getProject() ) {
                        var find = false;
                        if( !hashProject[actualSkill.getId()] ) hashProject[actualSkill.getId()] = [];
                        for (var j = 0; j < hashProject[actualSkill.getId()].length; j++) {
                            if( hashProject[actualSkill.getId()][j] == exp.getProject().getId() ) {
                                find = true;
                                break;
                            }                            
                        }
                        hashProject[actualSkill.getId()].push(exp.getProject().getId());
                        if( !find ) actualSkill.increaseProjectCount();
                    } 
                }
            }

            for (var i = 0; i < self._skills.length; i++) {
                var skillUser = self._skills[i];
                _hashSkill(skillUser);
            }

            for (var skillName in hash) {
                if (hash.hasOwnProperty(skillName)) {
                    self.$skills.push(hash[skillName]);                    
                }
            }            
        }

        return User;
         
    }

})();
