(function () {
  'use strict';

  angular
    .module('profile')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('people', {
        url: '/people',
        template: '<tt-profile-edit  user="$ctrl.user"></tt-profile-edit>',        
        controller: ['resolveUser', function (resolveUser) {
          this.user = resolveUser;
        }],
        controllerAs: '$ctrl',
        resolve: {
          resolveUser: ['userDataService', '$location', function (userDataService, $location) {
            return userDataService.get($location.search().email);
          }]
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
