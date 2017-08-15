(function() {
    'use strict';

    angular
        .module('shared')
        .factory('Skill', factory)

	/** @ngInject */
    function factory(ModelHelper) {
        //construtor
        function Skill(name) {
            if( !name ) throw "Skill contructor: name is required"; 
            this.setName(name);
            this._id = ModelHelper.guid();
            this.setValidated(false);
        }
         /**
         * Retorna o identificador dessa competência. 
         * @return identificador da competência. 
         */
        Skill.prototype.getId = function(){
            return this._id;
        }   


        Skill.prototype.getValidated = function(){ return this._validated; }
        Skill.prototype.setValidated = function(validated){ this._validated = validated; }

        Skill.prototype.getName = function(){ return this._name; }
        Skill.prototype.setName = function(name){ 
            if( !name) throw 'Skill.setName: illegal argument exception';
            this._name = name; 
        }

        Skill.prototype.getDescription = function(){ return this._description; }
        Skill.prototype.setDescription = function(description){ this._description = description; }

        /**
         * Constrói um objeto skill com o dado vindo do servidor. 
         * ATENCAO: Este é um método estático
         * 
         * @param {Object} data dado vindo do servidor sem manipulação nenhuma
         */
        Skill.buildFromServer = function (data) {
            var skill = new Skill(data.name);
            if( data.id ) skill._id = data.id;
            if( data.validated ) skill.setValidated(data.validated);
            if( data.description ) skill.setDescription(data.description);        
            return skill;
        };

        return Skill;
         
    }

})();
