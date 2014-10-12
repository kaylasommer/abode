(function(){
  'use strict';

  angular.module('abode')
  .controller('ExtrasCtrl', ['$scope', '$location', '$routeParams', 'House', function($scope, $location, $routeParams, House){

    $scope.house= {};
    $scope.houseId = $routeParams.houseId;

    House.getUsersHouse().then(function(response){
      $scope.house = response.data.house;
      $scope.features = $scope.house.features;
    });

    $scope.updateExtras = function(){
      $scope.house.necFeat = $scope.necFeat;
      House.update($scope.houseId, $scope.house).then(function(response){
        if(response){
          $scope.necFeat = [];
          toastr.success('You succesfully edited your Homefolio!');
          $location.path('/house');
        } else {
          toastr.error('Sorry something went wrong on our side.');
        }
      });
    };

  }]);
})();

