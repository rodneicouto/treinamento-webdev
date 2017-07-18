(function() {
    'use strict';

    angular
        .module('shared')
        .factory('Project', factory)

	/** @ngInject */
    function factory(Skill) {
        
        Project.prototype.name = name;

        //construtor
        function Project(name) {
            if( !name ) throw "Project constructor: name is required"
            
            //o id padrão será o nome sem espaço. 
            this._id = name.split(" ").join("").split(".").join(",");;
            this._name = name;
            this._skills = [];
        }
        Project.prototype.getId = function(){
            return this._id;
        }

        Project.prototype.getName = function(){ return this._name; }
        Project.prototype.setName = function(name){ this._name = name; }

        Project.prototype.getDescription = function(){ return this._description; }
        Project.prototype.setDescription = function(value){ this._description = value; }

        Project.prototype.getSkills = function(){ return this._skills };
        
        /**
         * Adiciona uma competencia ao projeto
         * @param {Skill} skill objeto competência
         */
        Project.prototype.addSkill = function(skill){
            if (!(skill instanceof Skill)) throw "Project.addSkill: Illegal Argument exception"
            this._skills.push(skill);
        }
        
        //metodos estaticos
        
        Project.buildFromServer = function (data) {
            var project = new Project(data.name);
            project._id = data.id;     
            if( data.description) project.setDescription(data.description);
            return project;
        };


        return Project;
         
    }

})();
