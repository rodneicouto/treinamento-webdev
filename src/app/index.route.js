(function() {
  'use strict';

  angular
    .module('app')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('test-page', {
        url: '/test-page',
        template: '<tt-test-page></tt-test-page>'
    });
  }

})();
