(function () {
	'use strict';

	angular
		.module('profile')
		.component('ttProfileEdit', {
			templateUrl: 'app/profile/edit/edit.component.html',
			controller: controller,
			controllerAs: '$ctrl',
			bindings: {
               user: '<'
            }
	});

	/** @ngInject */
	function controller() {	
		var $ctrl = this;
		$ctrl.$onInit = function() {
			
		}
	}

})();