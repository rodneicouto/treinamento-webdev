(function() {
    'use strict';

    angular
        .module('core')
        .factory('SearchSkill', factory)

	/** @ngInject */
    function factory() {
        //construtor
        function SearchSkill(name, id, projectCount, experienceCount) {
            if( !name || !id || !projectCount || !experienceCount ) 
                throw "name, id, projectCount and experienceCount are required"; 
            
            this._name = name;
            this._id = id;
            this._experienceCount = experienceCount;
            this._projectCount = projectCount;
        }

        SearchSkill.prototype.getName = function(){ return this._name; }

        SearchSkill.prototype.getId = function(){ return this._id; }

        SearchSkill.prototype.getProjectCount = function() { return this._projectCount; }

        SearchSkill.prototype.getExperienceCount = function() { return this._experienceCount; }

        /**
         * Constrói um objeto SearchSkill com o dado vindo do servidor. 
         * ATENCAO: Este é um método estático
         * 
         * @param {Object} data dado vindo do servidor sem manipulação nenhuma
         * @return {SearchSkill} 
         */
        SearchSkill.buildFromServer = function (data) {
            var skill = new SearchSkill(data.name, data.id, data.projectCount, data.experienceCount);
            return skill;
        };

        return SearchSkill;
         
    }

})();
