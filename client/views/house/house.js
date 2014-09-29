(function(){
  'use strict';

  angular.module('abode')
  .controller('HouseCtrl', ['$scope', 'House', function($scope, House){

    $scope.types = ['Craftsman', 'Foresquare', 'Queen Anne', 'Bungalow', 'Cottage', 'Gable Front','Greek Revival', 'Log Cabin', 'Ranch', 'Split-Level', 'Victorian', 'Tudor', 'Duplex'];
    $scope.house = {};

    $scope.addHouse = function(){
      House.create($scope.house).then(function(response){
        $scope.house = response.data.house;
      });
    };

    House.getUsersHouse().then(function(response){
      $scope.house = response.data.house;
    });

  }]);
})();
