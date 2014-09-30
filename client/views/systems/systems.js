(function(){
  'use strict';

  angular.module('abode')
  .controller('SystemsCtrl', ['$scope','$location', '$routeParams', 'House', function($scope, $location, $routeParams, House){

    $scope.heatingTypes = ['Forced Air', 'Radiant Heat', 'Hydronic: Hot Water Baseboard', 'Steam Radiator', 'Geothermal Heat Pump', 'Boiler', 'Other'];
    $scope.coolingTypes = ['HVAC', 'Central Air', 'Room A/C', 'Portable A/C', 'Mini Ductless A/C', 'Swamp Cooler', 'Other'];

    $scope.house= {};
    $scope.houseId = $routeParams.houseId;

    House.getUsersHouse().then(function(response){
      $scope.house = response.data.house;
    });

    $scope.updateSystems = function(){
      $scope.house.specs.systems = $scope.systems;
      House.update($scope.houseId, $scope.house).then(function(response){
        if(response){
          $scope.extras = {};
          toastr.success('You succesfully edited your Homefolio!');
          $location.path('/house');
        } else {
          toastr.error('Sorry something went wrong on our side.');
        }
      });
    };

  }]);
})();

