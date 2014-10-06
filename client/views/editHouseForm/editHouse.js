(function(){
  'use strict';
  angular.module('abode')
  .controller('EditHouseCtrl', ['$scope', '$modalInstance', 'House', function($scope, $modalInstance, House){

    House.getUsersHouse().then(function(response){
      $scope.house = response.data.house;
    });

    $scope.addHouse = function(){
      House.create($scope.house).then(function(response){
        $scope.house = response.data.house;
      });
    };

    $scope.ok = function(){
      $modalInstance.close();
    };

    $scope.cancel = function(){
      $modalInstance.dismiss('cancel');
    };
  }]);
})();

