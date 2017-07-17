(function() {
    'use strict';

    angular
        .module('shared')
        .factory('Experience', factory)

	/** @ngInject */
    function factory(SkillUser, Skill, ModelHelper, Project) {
        
        //construtor
        function Experience(title) {
            if( !title) throw 'Experience constructor: title is required';
            this._skills = [];
            this._id = ModelHelper.guid();
            this._skillChangeObservers = []; 
        }
        /**
         * Retorna o identificador desse usuário. 
         * @return identificador do usuário. 
         */
        Experience.prototype.getId = function(){
            return this._id;
        }

        Experience.prototype.getProject = function(){ return this._project; }
        Experience.prototype.setProject = function(project){ 
            if (!(project instanceof Project)) throw "Experience.setProject: Illegal Argument exception"
            return this._project = project; 
        }

        Experience.prototype.getDescription = function(){ return this._description; }
        Experience.prototype.setDescription = function(description){ return this._description = description; }

        Experience.prototype.getTitle = function(){ return this._title; }
        Experience.prototype.setTitle = function(title){ 
            if( !title) throw 'Experience.setTitle: illegal argument exception';
            return this._title = title; 
        }

        Experience.prototype.getStartDate = function(){ return this._startDate; }
        Experience.prototype.setStartDate = function(startDate){ 
            if( !Experience.testDate(startDate) ) throw "Experience.setStartDate: Invalid date format. See 'Experience.testDate' method for explanation"
            return this._startDate = startDate; 
        }

        Experience.prototype.getEndDate = function(){ return this._endDate;}
        Experience.prototype.setEndDate = function(endDate){ 
            if( !Experience.testDate(endDate) ) throw "Experience.setEndDate: Invalid date format. See 'Experience.testDate' method for explanation"
            return this._endDate = endDate; 
        }

        /**
         * Retorna as competencias desse usuário. O retorno sera um array com objetos
         * do tipo SkillUser
         * ATENCAO: O numero de experiencias e projetos não está atualizado nos objetos
         * retornados aqui. Para isso, use User.getSkill
         * 
         * @return {Array<SkillUser>} array com as experiencias do usuario
         */
        Experience.prototype.getSkills = function(){ return this._skills; }

        /**
         * Adiciona uma competencia ao usuario. Se existir uma competencia 
         * igual, a anterior é removida e a nova é adicionada
         * 
         * @param [SkillUser] skill competencia com seu nivel
         */
        Experience.prototype.addSkill = function(skillUser){ 
            if (!(skillUser instanceof SkillUser)) throw "Experience.addSkill: Illegal Argument exception"
            this.removeSkill(skillUser)
            this.fire(skillUser);
            return this._skills.push(skillUser); 
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
        Experience.prototype.removeSkill = function(skill){
            if (!(skill instanceof SkillUser) || !(skill instanceof SkillUser)) throw "Experience.removeSkill: Illegal Argument exception"
            this.fire(skill);
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
            var experience = new Experience(data.title);    
            experience._id = data.id;        
            if(data.description) experience.setDescription(data.description);            
            if(data.startDate) experience.setStartDate(data.startDate);            
            if(data.endDate) experience.setEndDate(data.endDate);     
            return experience;        
        };

        Experience.prototype.subscribe = function(fn) {
            this._skillChangeObservers.push(fn);
        },
    
        Experience.prototype.unsubscribe = function(fn) {
            this._skillChangeObservers = this.handlers.filter(
                function(item) {
                    if (item !== fn) {
                        return item;
                    }
                }
            );
        },
    
        Experience.prototype.fire = function(o) {
            var scope = this;
            this._skillChangeObservers.forEach(function(item) {
                item.call(scope, o);
            });
        }

        return Experience;
         
    }

})();
