(function() {
    'use strict';

    angular
        .module('shared')
        .factory('projectDataService', service);

	/** @ngInject */
    function service(firebaseService, $log, Project, $q, Skill) {
        
       return {
            search: search,
            list: list
       }
       /**
        * Lista de projetos que possuem no nome determinado valor
        *
        * @param {string} name substring do projeto. Eh feita uma busca usando like '%nome%'. 
        * @return {Array<Project>} array de projetos, ou vazio caso o nome seja inválido
        */
       function search(name){
            if( !name ){
                var deferred = $q.defer();
                deferred.resolve([]);
                return deferred.promise;
            }
            return _list(name);
            
       }

       /**
        * Lista todos os projetos existentes
        *
        * @return {List<Project>} listagem com todos os projetos
        */
       function list() {
            return _list(null);
       }


        /****************************************************************
        * Métodos privados
        *****************************************************************/

       function _list(q){
           return firebaseService.database().ref('/projects').once('value').then(function(snapshot){                
                var projects = [];
                var promissesSkill = [];
                var hashSkill = {};

                var data = snapshot.val();
                if( !data ) return [];

                for (var projectId in data) {
                    if (data.hasOwnProperty(projectId)) {
                        var _project = data[projectId];
                        _project.id = projectId;
                        if( !q || _project.name.toLowerCase().indexOf(q.toLowerCase()) >= 0 ){
                            var project = Project.buildFromServer(_project);
                            projects.push(project);
                            for (var property in _project.skills) {
                                if (_project.skills.hasOwnProperty(property)) {
                                    if( !hashSkill[property] ) {
                                        promissesSkill.push(firebaseService.database().ref('/skills/' + property).once('value').then(function(s){
                                            var skill = s.val();
                                            if( !skill ) return null;
                                            skill.id = s.key;
                                            return Skill.buildFromServer(skill);
                                        }));
                                        hashSkill[property] = [];
                                    } 
                                    hashSkill[property].push(project)
                                }
                            }
                        }
                    }
                }
                if( promissesSkill.length == 0 ){
                    return projects;
                }
                else {
                    return $q.all(promissesSkill).then(function(values){
                        for( var i = 0; i < values.length; i++ ){
                            var skill = values[i];
                            if( !skill ) continue;
                            for( var k =0; k < hashSkill[skill.getId()].length; k++ ){
                                hashSkill[skill.getId()][k].addSkill(skill);
                            }
                        }
                        return projects;
                    });
                }
            });
       }

    }


})();
