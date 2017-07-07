(function() {
    'use strict';

    angular
        .module('app')
        .factory('skillDataService', service);

	/** @ngInject */
    function service($window, $log, Skill) {
        
    //    return {
    //         user: users,
    //         create:create,
    //         remove:remove,
    //         join: join
    //    }
    //    /**
    //     * Lista de usuários que possuem determinada habilidade
    //     *
    //     * @param {string} key 
    //     * @return {Array<User>} usuário que possui a
    //     */
    //    function users(key){
    //         $log.info("get skill");
    //    }

    //    /**
    //     * Cria uma habilidade nova
    //     *
    //     * @param {Skill} skill 
    //     */
    //    function create(skill){
    //         $log.info("create skill");
    //    }

    //    /**
    //     * Remove uma habilidade
    //     *
    //     * @param {Skill} skill 
    //     */
    //    function remove(skill){
    //         $log.info("update skill");
    //    }

    //    /**
    //     * Junta duas ou mais habilitades em uma e atualiza os usuários 
    //     * que as possuem       
    //     *
    //     * @param {Array<Skill>} skills lista de habilitades
    //     */
    //    function join(skills){
    //         $log.info("list skill");
    //    }
    }


})();
