(function(){
  'use strict';

  angular.module('abode')
  .controller('HouseCtrl', ['$scope','$upload', function($scope, $upload){

  $scope.types = ['Craftsman', 'Foresquare', 'Queen Anne', 'Bungalow', 'Cottage', 'Gable Front','Greek Revival', 'Log Cabin', 'Ranch', 'Split-Level', 'Victorian', 'Tudor', 'Duplex'];

  
  }]);
})();

