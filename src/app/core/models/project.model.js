(function() {
    'use strict';

    angular
        .module('core')
        .factory('Project', factory)

	/** @ngInject */
    function factory() {
        
        Project.prototype.name = name;

        //construtor
        function Project() {
        }

        Project.prototype.getName = function(){
            return this._name;
        }
        Project.prototype.setName = function(name){
            return this._name = name;
        }

        
        //metodos estaticos
        
        Project.build = function (data) {
            var project = new Project();
            project.setName(data.name);          
        };


        return Project;
         
    }

})();
