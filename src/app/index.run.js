(function() {
  'use strict';

  angular
    .module('app')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,  $window) {

    $log.debug('configurando firebase...');    
    var config = {
      apiKey: "AIzaSyCXrbHSAhPlCgMRCYbp1GT5UGS53msS5k4",
      authDomain: "tec-talentos.firebaseapp.com",
      databaseURL: "https://tec-talentos.firebaseio.com",
      projectId: "tec-talentos",
      storageBucket: "tec-talentos.appspot.com",
      messagingSenderId: "350754979611"
    };
    $window.firebase.initializeApp(config);
  }

})();
