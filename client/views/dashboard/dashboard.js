(function(){
  'use strict';

  angular.module('abode')
  .controller('DashboardCtrl', ['$scope', 'Goal', function($scope, Goal){
    $scope.oneAtATime = true;
    $scope.goals = [];
    $scope.goal = {};

    Goal.index().then(function(response){
      $scope.goals = response.data.goals;
    });

    $scope.goalComplete = function(goal){
      var goalId = goal._id,
      index = _.indexOf($scope.goals, goal);
      Goal.goalComplete(goalId).then(function(response){
        $scope.goals.splice(index, 1);
      });
    };

    /*$scope.taskComplete = function(){
      Goal.taskComplete().then(function(response){

      });
    };*/

  }]);
})();

