(function(){
  'use strict';

  angular.module('kjCloneModule', [])
  .directive('kjClone', function(){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/clone/kj-clone.html';
    o.scope       = {};
    o.link        = function(scope, element, attrs){
                    };
    o.controller  = ['$scope', function($scope){
      $scope.cloneInput = function(){
        var $last  = $('#taskgroup'),
        $clone = $last.clone();
        $clone.find('input').each(function(){
          $(this).val('');
        });
        $clone.find('select').each(function(){
          $(this).val('');
        });
        $last.after($clone);
      };
    });

  });
})();
