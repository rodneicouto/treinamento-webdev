(function() {
    'use strict';



    angular
        .module('shared')
        .directive('ttAvatar', directive);

    /**
     * 
     * @param {*}  
     * @param {*} cbHashColorFilter 
     */
    /** @ngInject */
    function directive($window) {
        return {
            restrict: 'A',
            scope: {
                width: '@',
                fontSize: '@',
                name: '@',
                url: '@',
                square: '@',
                height: '@'
            },
            link: function(scope, element, attrs) {
                var redraw = function(){
                    var name = scope.name.toLowerCase();

                    var width = scope.width ? scope.width : "40px"
                    var height = scope.height ? scope.height : width;
                    var fontSize = scope.fontSize ? scope.fontSize : "18px"
                    var square = (scope.square == 'true') ? true: false;

                    if (!scope.url) {
                        var color = getColor(name);
                        var textColor = "#fff";
                        element.css('background-color', color);
                        element.css('color', textColor);
                        element.css('font-weight', '600');
                        element.html(nameSplit(name).toUpperCase());
                    } else {
                        element.css('background', "url(" + scope.url + ")");
                        element.css('background-repeat', "no-repeat");
                        element.css('background-size', width);
                    }

                    element.css('width', width);
                    element.css('height', height);

                    if( !square ) {
                        element.css('border-radius', '50%');
                    }

                    element.css('font-size', fontSize);
                    element.css('line-height', height);
                    element.css('text-align', 'center');

                    /***** Comeca a logica de cor */

                    function nameSplit(name) {
                        var parts = name.split(" ");
                        if (parts.length > 1) {
                            return parts[0].charAt(0) + parts[parts.length - 1].charAt(0);
                        }
                        return parts[0].charAt(0);
                    }


                    function getColor(str) {

                        var COLORS = ['#bdc2c8', '#4b4c4c', '#808e8e', '#b98b2d', '#2581bc', '#409fd8',
                            '#00a99e', '#76c379', '#5aba4b', '#e74c3c', '#d35828']

                        return COLORS[Math.abs(generateHashCode(str)) % COLORS.length];
                        
                    }

                    function generateHashCode(str) {
                        var h = 0;
                        if (str.length > 0) {
                            for (var i = 0; i < str.length; i++) {
                                h = 31 * h + str.charCodeAt(i);
                                h |= 0; // Convert to 32bit integer
                            }
                        }
                        return h;
                    }

                } /*redraw*/
                
                redraw();

                scope.$watch('name', function(newValue, oldValue) {
                    if (newValue !== oldValue && newValue != "") {
                        redraw();
                    }
                }, true);


            } /*link*/

        }; /*return*/
    }

})();
