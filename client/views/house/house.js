(function(){
  'use strict';

  angular.module('abode')
  .controller('HouseCtrl', ['$scope', 'House', function($scope, House){

    $scope.house = {};

    $scope.addHouse = function(){
      House.create($scope.house).then(function(response){
        $scope.house = response.data.house;
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
