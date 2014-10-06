(function(){
  'use strict';

  angular.module('abode')
  .controller('HouseCtrl', ['$scope', 'House', '$modal', function($scope, House, $modal){

    $scope.house = {};


    $scope.open = function(size){

      $modal.open({
        templateUrl: '/views/editHouseForm/editHouse.html',
        controller: 'EditHouseCtrl',
        size: size
      });
    };

    House.getUsersHouse().then(function(response){
      $scope.house = response.data.house;
    });

    $scope.toggleHouseForm = function(){
      $scope.showHouseForm = !!!$scope.showHouseForm;
    };

  }]);
})();
