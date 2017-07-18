(function() {
    'use strict';

    angular
        .module('shared')
        .factory('ModelHelper', factory)

	/** @ngInject */
    function factory() {
        
        //construtor
        function Helper() {}
       
        /**
         * Remove um item do array. 
         * ATENCAO: Tanto o item quanto os objetos do array devem ter um método getId().
         * 
         * @param [Object] Objeto com método getId()
         * @param [array<Object>] Array com objetos que contenha método getId()
         */
        Helper.removeItemById = function(item, array){
            if( !array || !item ) return;            
            for (var i = 0; i < array.length; i++) {
                if( item.getId() ==  array[i].getId() ) {
                    var removed = array[i];
                    array.splice(i, 1);
                    return removed;
                }                
            }
            return null;    
        }

        /**
         * Gera um UID
         * @return {string} UID
         */
        Helper.guid = function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
        }

        return Helper;
         
    }

})();
