(function() {
    'use strict';

    angular
        .module('core')
        .factory('Project', factory)

	/** @ngInject */
    function factory(Skill) {
        
        Project.prototype.name = name;

        //construtor
        function Project(name) {
            if( !name ) throw "name is required"
            
            //o id padrão será o nome sem espaço. 
            this._id = name.split(" ").join("").split(".").join(",");;
            this._name = name;
            this._skills = [];
        }
        Project.prototype.getId = function(){
            return this._id;
        }

        Project.prototype.getName = function(){ return this._name; }
        Project.prototype.setName = function(name){ return this._name = name; }

        Project.prototype.getSkills = function(){ return this._skills };
        
        /**
         * Adiciona uma competencia ao projeto
         * @param {Skill} skill objeto competência
         */
        Project.prototype.addSkill = function(skill){
            this._skills.push(skill);
        }
        
        //metodos estaticos
        
        Project.buildFromServer = function (data) {
            var project = new Project(data.name);
            project._id = data.id;     
            if( data.skills ) {
                for (var property in data.skills) {
                    if (data.skills.hasOwnProperty(property)) {
                        project.addSkill(new Skill(property))
                    }
                }   
            }  
            return project;    
        };


        return Project;
         
    }

})();
