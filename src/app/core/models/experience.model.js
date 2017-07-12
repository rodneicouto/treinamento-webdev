(function() {
    'use strict';

    angular
        .module('core')
        .factory('Experience', factory)

	/** @ngInject */
    function factory(SkillUser, Skill, ModelHelper) {
        
        //construtor
        function Experience() {
            this._skills = [];
            this._id = ModelHelper.guid();
        }
        /**
         * Retorna o identificador desse usuário. 
         * @return identificador do usuário. 
         */
        Experience.prototype.getId = function(){
            return this._id;
        }

        Experience.prototype.getProject = function(){ return this._project; }
        Experience.prototype.setProject = function(project){ return this._project = project; }

        Experience.prototype.getDescription = function(){ return this._description; }
        Experience.prototype.setDescription = function(description){ return this._description = description; }

        Experience.prototype.getTitle = function(){ return this._title; }
        Experience.prototype.setTitle = function(title){ return this._title = title; }

        Experience.prototype.getStartDate = function(){ return this._startDate; }
        Experience.prototype.setStartDate = function(startDate){ 
            if( !Experience.testDate(startDate) ) throw "Invalid date format. See 'Experience.testDate' method for explanation"
            return this._startDate = startDate; 
        }

        Experience.prototype.getEndDate = function(){ return this._endDate;}
        Experience.prototype.setEndDate = function(endDate){ 
            if( !Experience.testDate(endDate) ) throw "Invalid date format. See 'Experience.testDate' method for explanation"
            return this._endDate = endDate; 
        }

        /**
         * Retorna as competencias desse usuário. O retorno sera um array com objetos
         * do tipo SkillUser
         * @return {Array<SkillUser>} array com as experiencias do usuario
         */
        Experience.prototype.getSkills = function(){ return this._skills; }

        /**
         * Adiciona uma competencia ao usuario. Se existir uma competencia 
         * igual, a anterior é removida e a nova é adicionada
         * 
         * @param [SkillUser] skill competencia com seu nivel
         */
        Experience.prototype.addSkill = function(SkillUser){ 
            this.removeSkillUser(SkillUser)
            return this._skills.push(SkillUser); 
        }

        /**
         * Remove uma competencia do usuario. 
         * 
         * ATENCAO: O Objeto pode ser tanto um Skill quanto um SkillUser. 
         * Lembre-se que nao existe interface me JS Vanila, logo não tem como 
         * amarrar a uma interface
         * 
         * @param [SkillUser | Skill] skill competencia com seu nivel
         */
        Experience.prototype.removeSkillUser = function(skill){
            ModelHelper.removeItemById(skill, this._skills);
        }

        /**
         * Testa se a data é válida. Exemplos de datas válidas:
         * 01/1998
         * 12/2004
         * 
         * Datas inválidas:
         * 1/1998
         * 01/98
         * 01/1898
         * 01/2198
         */
        Experience.testDate = function(date){
            var expression = /^((1[0-2]|0[1-9])\/(19\d{2}|20\d{2}))$/
            if( expression.test(date)) return true;
            return false;
        }

        /**
         * Constrói um objeto skill com o dado vindo do servidor. 
         * ATENCAO: Este é um método estático
         * 
         * @param {Object} data dado vindo do servidor sem manipulação nenhuma
         */
        Experience.buildFromServer = function (data) {
            var experience = new Experience();    
            experience._id = data.id;        
            if(data.description) experience.setDescription(data.description);            
            if(data.startDate) experience.setStartDate(data.startDate);            
            if(data.endDate) experience.setEndDate(data.endDate);            
            if(data.title) experience.setTitle(data.title);         
            return experience;        
        };

        return Experience;
         
    }

})();
