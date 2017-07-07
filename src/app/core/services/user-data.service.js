(function() {
    'use strict';

    angular
        .module('app')
        .factory('userDataService', service);

	/** @ngInject */
    function service($window, $log) {

    //    return {
    //         get: get,
    //         create:create,
    //         update:update,
    //         list: list
    //    }
    //    /**
    //     * Obtem um usuário pelo seu login
    //     *
    //     * @param {string} login do usuário a ser encontrado
    //     */
    //    function get(login){
    //         $log.info("get user");
    //    }

    //    /**
    //     * Usuário a ser criado
    //     *
    //     * @param {User} user Usuário para ser criado no firebase
    //     */
    //    function create(user){
    //         $log.info("create user");
    //    }

    //    /**
    //     * Usuário a ser atualizado
    //     *
    //     * @param {User} user Usuário para ser atualizado no firebase
    //     */
    //    function update(user){
    //         $log.info("update user");
    //    }
    //    /**
    //     * @return {Array<User>} lista de usuários
    //     */
    //    function list(){
    //         $log.info("list users");
    //    }
    }


})();
