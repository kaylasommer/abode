(function(){
  'use strict';

  angular.module('abode')
  .controller('GeneralCtrl', ['$scope', '$routeParams', function($scope, $routeParams){

  $scope.types = ['Craftsman', 'Foresquare', 'Queen Anne', 'Bungalow', 'Cottage', 'Gable Front','Greek Revival', 'Log Cabin', 'Ranch', 'Split-Level', 'Victorian', 'Tudor', 'Duplex'];
  }]);
})();

