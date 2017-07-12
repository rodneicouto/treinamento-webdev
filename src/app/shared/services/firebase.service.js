(function() {
    'use strict';

    angular
        .module('shared')
        .factory('firebaseService', service);

	/** @ngInject */
    function service($window, $log) {
       
       var _defaultApp = null;

       return {
            initialize: initialize,
            defaultApp: defaultApp,
            database: database,
            encodeToPath: encodeToPath,
            decodeFromPath: decodeFromPath
       }     

       function initialize() {
            $log.debug('configurando firebase...');    
            var config = {
                apiKey: "AIzaSyCXrbHSAhPlCgMRCYbp1GT5UGS53msS5k4",
                authDomain: "tec-talentos.firebaseapp.com",
                databaseURL: "https://tec-talentos.firebaseio.com",
                projectId: "tec-talentos",
                storageBucket: "tec-talentos.appspot.com",
                messagingSenderId: "350754979611"
            };
            _defaultApp = $window.firebase.initializeApp(config);
       }

       function defaultApp(){
            return _defaultApp;
       }

       function database(){
           return $window.firebase.database();
       }

       function encodeToPath(path) {
            return path.split(".").join(",");
        }

        function decodeFromPath(path) {
            return path.split(",").join(".");
        }

    }


})();
