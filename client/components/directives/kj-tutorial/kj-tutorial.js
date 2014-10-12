(function(){
  'use strict';

  angular.module('abode')
  .directive('kjTutorial', [function(){
    var intervalId = 0,
        scrollTo = function(el, cb){
      $('html, body').animate({
        scrollTop: $(el).offset().top - 60
      }, 1000, cb);
    };

    return {
      restrict: 'A',
      scope: {
        elements: '&',
        interval: '@'
      },
      link: function(scope, elem, attrs, fn){

        scope.$watch('elements', function(value){
          if (value){
            var index = 0,
                interval = parseInt(scope.interval);

            intervalId = setInterval(function(){
              scrollTo(scope.elements[index], function(){
                $(scope.elements[index]).tooltip('show');
                if (index === scope.elements.length - 1){
                  clearInterval(intervalId);
                } else {
                  index++;
                }
              });
            }, interval);
          }
        });
      }
    };
  }]);
})();
