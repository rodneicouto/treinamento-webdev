(function () {
	'use strict';

	angular
		.module('core')
		.component('ttTestPage', {
			templateUrl: 'app/core/hello/hello.component.html',
			controller: controller,
			controllerAs: '$ctrl'
	});
	
	/**
	 * ATENCAO: O comentário abaixo substitui a necessidade de controller.$inject = []
	 * Isso so funciona pois o projeto está configurado com um plugin para automatizar isso
	 */
	/** @ngInject */
	function controller(skillDataService, userDataService, projectDataService, Experience, User, SkillUser, $log) {	
		var $ctrl = this;
		$ctrl.$onInit = function() {
			
			var compotenciaJava;
			var projetoWebSintese;

			/* Passo 1: Busco todas as habilidades que contenham a palavra Java.*/
			skillDataService.search("Java").then(function(competencias){

				//Para o meu exemplo pego logo a primeira. Se fosse real deveria verificar, das
				//retornadas, qual atende melhor
				compotenciaJava = competencias[0];

				/* Passo 2: Busco o projeto WebSintese */
				return projectDataService.search("WebSintese");

			}).then( function(projetos){
				/* Passo 3: recupero o projeto WebSintese */
				projetoWebSintese = projetos[0];			
				
				/* Passo 4: crio a experiencia 
				* ATENCAO: Eu so consigo dar um 'new Experience()' pois injetei no construtor
				* a factory Experience, que representa o modelo dessa classe. 
				* Ocorreria um erro sem isso */
				var experiencia = new Experience("Desenvolvedor sênior");
				
				/* Passo 5: Adiciono a competência java a experiência com o nível mais alto */
				experiencia.addSkill(new SkillUser(compotenciaJava, 3));

				/* Passo 6: Adiciono o projeto WebSintese a experiencia */
				experiencia.setProject(projetoWebSintese);

				/* Passo 7: Crio o usuário
				* ATENCAO: Eu so consigo dar um 'new User()' pois injetei no construtor
				* a factory User, que representa o modelo dessa classe
				* Ocorreria um erro sem isso */
				var user = new User("johndoe@tecgraf.puc-rio.br");
				user.setName("Jown Doe da Silva");

				/* Passo 8: Adiciona a experienca ao usuário */
				user.addExperience(experiencia);
				
				/* Passo 9: Salvo o usuário */
				userDataService.create(user).then(function(){
					$log.info( "Criou com sucesso");
					alert('Usuário salvo com sucesso');
				}).catch(function(error){
					$log.error(error);
					alert('Ocorreu um erro ao salvar o usuário');
				});
				
			}).catch(function(error){
				$log.error(error);
				alert('Ocorreu um erro inesperado');
			});

		}
	}

})();




