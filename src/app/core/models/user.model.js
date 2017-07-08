(function() {
    'use strict';

    angular
        .module('core')
        .factory('User', factory)

	/** @ngInject */
    function factory() {
        
        //construtor
        function User(){
        }
        
        User.prototype.getEmail = function(){
            return this._email;
        }
        User.prototype.setEmail = function(email){
            return this._email = email;
        }

        User.prototype.getName = function(){
            return this._name;
        }
        User.prototype.setName = function(name){
            return this._name = name;
        }

        User.prototype.getLattes = function(){
            return this._lattes;
        }
        User.prototype.setLattes = function(value){
            return this._lattes = value;
        }

        User.prototype.getLinkedIn = function(){
            return this._linkedIn;
        }
        User.prototype.setLinkedIn = function(linkedIn){
            return this._linkedIn = linkedIn;
        }
        
        //metodos estaticos
        
        User.build = function (data) {
            var user = new User();
            user.setName(data.name);
            if(data.linkedIn) user.setLinkedIn(data.linkedIn);            
            if(data.lattes) user.setLattes(data.lattes);    
            return user;        
        };

        return User;
         
    }

})();
