(function(){
  'use strict';

  angular.module('abode')
  .controller('GoalCtrl', ['$scope', 'Goal', function($scope, Goal){
    $scope.goal = {};
    $scope.goals = [];
    $scope.task = '';
    $scope.tasks = [];

    $scope.addGoal = function(){
      Goal.create($scope.goal).then(function(response){
        $scope.goals.push(response.data.goal);
        $scope.goal = {};
      });
    };


  }]);
})();

