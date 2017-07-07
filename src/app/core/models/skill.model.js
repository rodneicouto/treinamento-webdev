(function() {
    'use strict';

    angular
        .module('app')
        .factory('Skill', factory)

	/** @ngInject */
    function factory() {
        
        Skill.prototype.name = name;

        //construtor
        function Skill() {
        }

        Skill.prototype.getName = function(){
            return this._name;
        }
        Skill.prototype.setName = function(name){
            return this._name = name;
        }

        
        //metodos estaticos
        
        Skill.build = function (data) {
            var skill = new Skill();
            skill.setName(data.name);          
        };


        return Skill;
         
    }

})();
