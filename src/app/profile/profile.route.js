(function () {
  'use strict';

  angular
    .module('profile')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        template: '<tt-example  user="$ctrl.user"></tt-example>',        
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
  }

})();
