(function(){
  'use strict';

  angular.module('abode')
  .controller('HouseCtrl', ['$scope', 'House', '$modal', function($scope, House, $modal){

    $scope.house = {};


    $scope.open = function(size){

      var modalInstance = $modal.open({
        templateUrl: '/views/editHouseForm/editHouse.html',
        controller: 'EditHouseCtrl',
        size: size,
        resolve: {
          house: function(){
            return $scope.house;
          }
        }
      });
      modalInstance.result.then(function(house){
        $scope.house = house;
      });
    };

    House.getUsersHouse().then(function(response){
      $scope.house = response.data.house;
      if (!$scope.house.photo) {
        $scope.house.photo = '/assets/img/default.jpg';
      }
    });

  }]);
})();
