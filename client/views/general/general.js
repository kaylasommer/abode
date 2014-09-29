(function(){
  'use strict';

  angular.module('abode')
  .controller('GeneralCtrl', ['$scope', '$routeParams', 'House', function($scope, $routeParams, House){

    $scope.types = ['Craftsman', 'Foresquare', 'Queen Anne', 'Bungalow', 'Cottage', 'Gable Front','Greek Revival', 'Log Cabin', 'Ranch', 'Split-Level', 'Victorian', 'Tudor', 'Duplex'];
    $scope.house= {};
    $scope.houseId = $routeParams.houseId;

    House.getUsersHouse().then(function(response){
      $scope.house = response.data.house;
    });

    $scope.updateGeneral = function(){
      var general = $scope.general;
      debugger;
      $scope.house.specs.push(general);
      House.update($scope.houseId, $scope.general).then(function(response){
        if(response){
          $scope.general = {};
        } else {
          alert('Sorry we failed to do something.');
        }
      });
    };

  }]);
})();

