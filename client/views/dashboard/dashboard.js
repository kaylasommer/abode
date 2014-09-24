(function(){
  'use strict';

  angular.module('abode')
  .controller('DashboardCtrl', ['$scope', 'Goal', function($scope, Goal){
    $scope.oneAtATime = true;
    $scope.goals = [];

    Goal.index().then(function(response){
      $scope.goals = response.data.goals;
    });

  }]);
})();

