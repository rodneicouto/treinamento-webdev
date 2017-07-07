(function () {
	'use strict';

	angular
		.module('app')
		.component('ttHello', {
			templateUrl: 'app/core/hello/hello.component.html',
			controller: controller,
			controllerAs: '$ctrl'
	});

	/** @ngInject */
	function controller() {	
	}

})();