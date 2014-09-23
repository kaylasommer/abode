(function(){
  'use strict';

  angular.module('abode')
  .controller('GoalCtrl', ['$scope', 'Goal', function($scope, Goal){
    $scope.goal = {};
    $scope.goals = [];
    $scope.task = {};
    $scope.tasks = [];

    $scope.addGoal = function(){
      Goal.create($scope.goal).then(function(response){
        $scope.goals.push(response.data.goal);
        $scope.goal = {};
      });
    };

    Goal.index().then(function(response){
      $scope.goals = response.data.goals;
    });

    $scope.addTask = function(){
      Goal.addTask($scope.task).then(function(response){
        $scope.tasks.push(response.data.task);
        $scope.task = {};
      });
    };

  }]);
})();

