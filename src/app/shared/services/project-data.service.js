(function() {
    'use strict';

    angular
        .module('shared')
        .factory('projectDataService', service);

	/** @ngInject */
    function service(firebaseService, $log, Project) {
        
       return {
            get: get,
            list: list
       }
       /**
        * Lista de usuários que possuem determinada habilidade
        *
        * @param {string} id id do projeto 
        * @return {Project} projeto de determinado ID
        */
       function get(id){
            var u = new Project();
            u.setName("p");
            $log.info(u);
            $log.info(u.getName());
       }

       /**
        * Lista todos os projetos existentes
        *
        * @return {List<Project>} listagem com todos os projetos
        */
       function list(){
            $log.info("list Project");
       }

    }


})();
