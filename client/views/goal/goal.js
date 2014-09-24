(function(){
  'use strict';

  angular.module('abode')
  .controller('GoalCtrl', ['$scope', 'Goal', function($scope, Goal){
    $scope.goal = {};
    $scope.goals = [];
    $scope.oneAtATime = true;

    $scope.groups =[
      {
        title: 'Dynamic Group Header - 1',
        content: 'Dynamic Group Body - 1'
      },
      {
        title: 'Dynamic Group Header - 2',
        content: 'Dynamic Group Body - 2'
      }
    ];

    $scope.items =['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function(){
      var newItemNo = $scope.items.length + 1;
      $scope.items.push('Item ' + newItemNo);
    };

    $scope.status ={
      isFirstOpen: true,
      isFirstDisabled: false
    };

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

