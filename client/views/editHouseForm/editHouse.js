(function(){
  'use strict';
  angular.module('abode')
  .controller('EditHouseCtrl', ['$scope', '$modalInstance', 'House', 'house', function($scope, $modalInstance, House, house){

    $scope.house = house;

    $scope.addHouse = function(){
      $modalInstance.close($scope.house);
      House.create($scope.house).then(function(response){
        house.photo = response.data.house.photo;
        toastr.success('Your Photo has been changed, it will load on refresh!');
      });
    };

    $scope.cancel = function(){
      $modalInstance.dismiss('cancel');
    };

  }]);
})();

