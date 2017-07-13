(function() {
    'use strict';

    angular
        .module('shared')
        .factory('SkillUser', factory)

	/** @ngInject */
    function factory(Skill) {

        /**
         * 
         * @param {Skill} skill competência 
         * @param {int} level nivel da habilidade: 0 para baixa, 1 para média e 2 para avançado
         */
        function SkillUser(skill, level) {
            if( !skill || !level == null ) throw "SkillUser contructor: skill and level are required"; 
            if (!(skill instanceof Skill)) throw "SkillUser contructor: Illegal Argument exception"
            this._skill = skill;
            this.setLevel(level);
            this._projectCount = 0;
            this._experienceCount = 0;
        }
        /**
         * altera o nível da competência 
         * @param {int} level nivel da habilidade: 0 para baixa, 1 para média e 2 para avançado
         */
        SkillUser.prototype.setLevel= function(level) { 
            if( level != 1 && level != 2 && level != 3 ) { throw "SkillUser.setLevel: Ilegal SkillUser.level argument"; }
            this._level = level; 
        }
        SkillUser.prototype.getLevel = function() { return this._level; }

        SkillUser.prototype.setProjectCount = function(projectCount) { this._projectCount = projectCount; }
        SkillUser.prototype.getProjectCount = function() { return this._projectCount; }
        SkillUser.prototype.increaseProjectCount = function(){
            this._projectCount ++;
        }

        SkillUser.prototype.setExperienceCount = function(experienceCount) { this._experienceCount = experienceCount; }
        SkillUser.prototype.getExperienceCount = function() { return this._experienceCount; }
        SkillUser.prototype.increaseExperienceCount = function(){
            this._experienceCount ++;
        }
        
        SkillUser.prototype.getSkill = function() { return this._skill; }

        SkillUser.prototype.getName = function() { return this._skill.getName(); }

        SkillUser.prototype.getDescription = function(){ return this._skill.getDescription(); }

        SkillUser.prototype.getValidated = function(){ return this._skill.getValidated(); }

        SkillUser.prototype.getId = function() { 
            return this._skill.getId(); 
        }

        return SkillUser;
         
    }

})();
