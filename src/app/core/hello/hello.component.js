(function () {
	'use strict';

	angular
		.module('core')
		.component('ttTestPage', {
			templateUrl: 'app/core/hello/hello.component.html',
			controller: controller,
			controllerAs: '$ctrl'
	});

	/** @ngInject */
	function controller(userDataService, User) {	
		var $ctrl = this;
		$ctrl.$onInit = function() {
			//userDataService.create(u);
			userDataService.get("rodnei@tecgraf.puc-rio.br").then(function(value){
				console.log("usuario", value);
				console.log("skill", value.getSkills());
				userDataService.create(value);
			}).catch(function(e){
				console.log("usuario-erro", e);
			});
			

		}
	}

})();