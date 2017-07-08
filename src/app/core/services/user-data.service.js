(function() {
    'use strict';

    angular
        .module('core')
        .factory('userDataService', service);

	/** @ngInject */
    function service(firebaseService, $log, User) {

       return {
            get: get,
            create:create,
            update:update,
            list: list
       }
       /**
        * Obtem um usuário pelo seu login
        *
        * @param {string} login do usuário a ser encontrado
        */
       function get(email){
           //https://stackoverflow.com/questions/16421179/whats-the-best-way-of-structuring-data-on-firebase
           return firebaseService.database().ref('/users/' + firebaseService.encodeToPath(email)).once('value').then(function(snapshot) {
                var data = snapshot.val();
                data.email = email;
                var user = User.build(data);                
                return user;
            });
       }

       /**
        * Usuário a ser criado
        *
        * @param {User} user Usuário para ser criado no firebase
        */
       function create(user) {     
           //https://firebase.googleblog.com/2015/09/introducing-multi-location-updates-and_86.html       
            $log.debug("create user");
            var updates = {};
            updates['users/' + firebaseService.encodeToPath(user.getEmail())] = _buildFirebaseObject(user);
            firebaseService.database().ref().update(updates);
       }

       /**
        * Usuário a ser atualizado
        *
        * @param {User} user Usuário para ser atualizado no firebase
        */
       function update(user){
            $log.info("update user");
       }
       /**
        * @return {Array<User>} lista de usuários
        */
       function list(){
            $log.info("list users");
       }


       function _buildFirebaseObject(user){
            var toSend = {};
            toSend.name = user.getName();
            if( user.getLinkedIn()) toSend.linkedIn = user.getLinkedIn();
            if( user.getLattes()) toSend.lattes = user.getLattes();
            return toSend;
       }
    }


})();
