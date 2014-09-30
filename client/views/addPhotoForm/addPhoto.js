(function(){
  'use strict';
  angular.module('abode')
  .controller('AddPhotoCtrl', function ($scope, $modalInstance) {

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
})();
