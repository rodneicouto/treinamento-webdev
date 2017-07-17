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
			
			
				userDataService.get("rodnei@tecgraf.puc-rio.br").then(function(value){
					console.log("usuario", value);
					console.log("skill", value.getSkills());
					var skill = value.getSkillByName("java");
					value.getExperiences()[0].removeSkill(skill);

					//userDataService.create(value);

				//skillDataService.users(['c++', 'java']).then(function(value){
				//projectDataService.search("web").then(function(value){
				//skillDataService.search("c").then(function(value){

				// var s = new Skill("VisualStudio");
				// s.setDescription("editor de texto");
				// skillDataService.create(s).then(function(value){
					console.log(value);
				}).catch(function(e){
					console.log("usuario-erro", e);
				});	
		}
	}

})();




