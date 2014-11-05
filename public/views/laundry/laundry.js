(function(){
  'use strict';

  angular.module('abode')
  .controller('LaundryCtrl', ['$scope', '$location', '$routeParams', 'House', function($scope, $location, $routeParams, House){

    $scope.wallcoverings = ['Exposed Brick', 'Paint', 'Tile', 'Wallpaper', 'Wood', 'Other'];
    $scope.floorings = ['Bamboo', 'Carpet', 'Concrete', 'Cork', 'Hardwood', 'Laminate', 'Linoleum/Vinyl', 'Porcelian/Ceramic Tile', 'Stone Tile', 'Other'];
    $scope.counters = ['Concrete', 'Granite', 'Laminate', 'Limestone', 'Marble', 'Quartz', 'Soapstone', 'Solid Surface(Corian)', 'Tile', 'Stainless Steel', 'Wood', 'Other'];

    $scope.house= {};
    $scope.houseId = $routeParams.houseId;

    House.getUsersHouse().then(function(response){
      $scope.house = response.data.house;
      $scope.laundry = $scope.house.specs.laundry;
    });

    $scope.updateLaundry = function(){
      $scope.house.specs.laundry = $scope.laundry;
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


