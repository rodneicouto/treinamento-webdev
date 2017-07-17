(function () {
	'use strict';

	angular
		.module('profile')
		.component('ttExample', {
			templateUrl: 'app/profile/example/example.component.html',
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
			$ctrl.itemArray = [
				{id: 1, name: 'first'},
				{id: 2, name: 'second'},
				{id: 3, name: 'third'},
				{id: 4, name: 'fourth'},
				{id: 5, name: 'fifth'},
			];
			$ctrl.selected = { value: $ctrl.itemArray[0] };
	
			$ctrl.myData = [
				{
					"firstName": "Cox",
					"lastName": "Carney",
					"company": "Enormo",
					"employed": true
				},
				{
					"firstName": "Lorraine",
					"lastName": "Wise",
					"company": "Comveyer",
					"employed": false
				},
				{
					"firstName": "Nancy",
					"lastName": "Waters",
					"company": "Fuelton",
					"employed": false
				}
			];
		}
	}

})();