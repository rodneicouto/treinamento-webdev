(function () {
	'use strict';

	angular
		.module('core')
		.component('ttHello', {
			templateUrl: 'app/core/hello/hello.component.html',
			controller: controller,
			controllerAs: '$ctrl'
	});

	/** @ngInject */
	function controller(userDataService, User) {	
		var $ctrl = this;
		$ctrl.$onInit = function() {
			var u = new User();

			u.setName("Rodnei Silva Couto");
			u.setEmail("rodnei@tecgraf.puc-rio.br");

			userDataService.create(u);
		}
	}

})();