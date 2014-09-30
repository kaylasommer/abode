(function(){
  'use strict';

  angular.module('abode')
  .controller('GeneralCtrl', ['$scope', '$routeParams', '$location', 'House', function($scope, $routeParams, $location, House){

    $scope.types = ['Craftsman', 'Foresquare', 'Queen Anne', 'Bungalow', 'Cottage', 'Gable Front','Greek Revival', 'Log Cabin', 'Ranch', 'Split-Level', 'Victorian', 'Tudor', 'Duplex', 'Other'];
    $scope.sidings = ['Stucco', 'Stone', 'Brick', 'Wood', 'Metal', 'Vinyl', 'Fiber Cement', 'Other'];
    $scope.windows = ['Casement', 'Double-Hung', 'Awning', 'Specialty', 'Picture', 'Gliding', 'Stationary', 'Bay', 'Other'];
    $scope.doors = ['Steel', 'Fiberglass Composite', 'Aluminum', 'Wood'];
    $scope.house= {};
    $scope.houseId = $routeParams.houseId;

    House.getUsersHouse().then(function(response){
      $scope.house = response.data.house;
    });

    $scope.updateGeneral = function(){
      $scope.house.specs.general = $scope.general;
      House.update($scope.houseId, $scope.house).then(function(response){
        if(response){
          $scope.general = {};
          toastr.success('You succesfully edited your Homefolio!');
          $location.path('/house');
        } else {
          toastr.error('Sorry something went wrong on our side.');
        }
      });
    };

  }]);
})();

