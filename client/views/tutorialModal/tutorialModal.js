(function(){
  'use strict';
  angular.module('abode')
  .controller('TutorialModalCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance){

    $scope.ok = function(){
      $modalInstance.close();
    };

  }]);
})();


