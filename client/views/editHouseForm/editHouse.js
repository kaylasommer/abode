(function(){
  'use strict';
  angular.module('abode')
  .controller('EditHouseCtrl', ['$scope', '$modalInstance', 'House', 'house', function($scope, $modalInstance, House, house){

    $scope.house = house;

    $scope.addHouse = function(){
      $modalInstance.close();
      House.create($scope.house).then(function(response){
        house.photo = response.data.house.photo;
        toastr.success('Your Photo has been changed, it will load on refresh!');
      });
    };

    $scope.ok = function(){
      $modalInstance.close();
    };

  }]);
})();

