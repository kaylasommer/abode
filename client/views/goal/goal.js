(function(){
  'use strict';

  angular.module('abode')
  .controller('GoalCtrl', ['$scope', 'Goal', function($scope, Goal){
    $scope.goal = {};
    $scope.goals = [];
    $scope.oneAtATime = true;

    $scope.today = function(){
      $scope.goal.due = new Date();
    };
    $scope.today();

    $scope.addGoal = function(){
      Goal.create($scope.goal).then(function(response){
        $scope.goals.push(response.data.goal);
        $scope.goal = {};
      });
    };

    Goal.index().then(function(response){
      $scope.goals = response.data.goals;
    });

    $scope.addTask = function(goal){
      goal.task.goalId = goal._id;
      Goal.add(goal.task).then(function(response){
        if (response.status === 200) {
          goal.tasks.push(goal.task);
        }
        goal.task = {};
      });
    };

  }]);
})();

