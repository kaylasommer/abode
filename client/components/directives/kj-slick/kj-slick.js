(function(){
  'use strict';

  angular.module('abode')
  .directive('kjSlick', [function(){
    return {
      restrict: 'A',
      scope: {
        slides: '=kjSlick'
      },
      templateUrl: '/components/directives/kj-slick/kj-slick.html',
      link: function(scope, elem, attrs, fn){
        scope.$watch('slides', function(value){
          if (value){
            elem.slick({
              infinite: true,
              arrows: true,
              fade:true
            });
          }
        });
      }
    };
  }]);
})();
