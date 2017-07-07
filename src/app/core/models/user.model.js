(function() {
    'use strict';

    angular
        .module('app')
        .factory('Skill', factory)

	/** @ngInject */
    function factory(Skill) {
        
        //construtor
        function User(){
        }

        User.prototype.getName = function(){
            return this._name;
        }
        User.prototype.setName = function(name){
            return this._name = name;
        }

        User.prototype.getPassword = function(){
            return this._password;
        }
        User.prototype.setPassword = function(password){
            return this._password = password;
        }

        User.prototype.getLinkedin = function(){
            return this._linkedin;
        }
        User.prototype.setLinkedin = function(linkedin){
            return this._linkedin = linkedin;
        }
        
        //metodos estaticos
        
        User.build = function (data) {
            var user = new User();
            user.setName(data.name);
            user.setPassword(data.password);
            user.setLinkedin(data.linkedin);            
        };

        return User;
         
    }

})();
