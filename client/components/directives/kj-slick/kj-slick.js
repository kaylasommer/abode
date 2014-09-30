(function(){
  'use strict';

  angular.module('abode')
  .directive('kjSlick', [function(){
    return {
      restrict: 'E',
      scope: {
        slides: '='
      },
      templateUrl: '/components/directives/kj-slick/kj-slick.html',
      link: function(scope, el, attrs, fn){
        scope.$watch(attrs.slides, function(value){
          if (value){
            el.slick({
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
