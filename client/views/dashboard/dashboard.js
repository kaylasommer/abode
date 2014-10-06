(function(){
  'use strict';

  angular.module('abode')
  .controller('DashboardCtrl', ['$scope', 'User', 'Goal', 'Dashboard', '$location', function($scope, User, Goal, Dashboard, $location){
    $scope.oneAtATime = true;
    $scope.goals = [];
    $scope.goal = {};
    $scope.user = {};
    $scope.house = {};
    $scope.recommendations = {};
    $scope.feeds = [
      {name: 'Dwell on Kitchens', url: 'http://www.dwell.com/kitchens/feed'},
      {name: 'Dwell Articles', url: 'http://www.dwell.com/articles/feed'},
      {name: 'This Old House: Planning and Ideas', url:'http://feeds.thisoldhouse.com/ThisOldHousePlanningAndIdeas'},
      {name: 'This Old House: How To and Repair', url: 'http://feeds.thisoldhouse.com/ThisOldHouseHow-toAndRepair'},
      {name: 'Southern Living: Home and Garden', url: 'http://feeds.southernliving.com/SouthernLiving/homeandgarden?format=xml'},
      {name: 'Southern Living: Editors Picks from My Home Ideas', url:'http://feeds.myhomeideas.com/myhome/latest-news?format=xml'},
      {name: 'Inhabitant: Sustainable Design Innovation on Interiors', url: 'http://feeds.feedburner.com/inhabitat/interiors'}
    ];

    Dashboard.findAll().then(function(response){
      $scope.user = response.data.user;
      $scope.house = response.data.house;
      $scope.goals = response.data.goals;
      Dashboard.getRecommendations($scope.house._id).then(function(response){
        $scope.recommendations = response.data.recommendations;
      });
    });

    $scope.subscribeUser = function(){
      User.subscribeToRss($scope.user).then(function(response){
        $scope.user = response.data.user;
        toastr.success('Awesome! We will have your feeds up shortly!');
        $location.path('/dashboard');
      });
    };

    $scope.addGoal = function(){
      Goal.create($scope.goal).then(function(response){
        $scope.goals.push(response.data.goal);
        $scope.goal = {};
      });
    };

    $scope.sortableOptions = {
      stop: function(e, ui){
        var goal = ui.item.scope().$parent.$parent.goal;
        Goal.update(goal).then(function(){
        });
      }
    };

    $scope.addTask = function(goal){
      goal.task.goalId = goal._id;
      Goal.add(goal.task).then(function(response){
        if (response.status === 200) {
          goal.tasks.push(goal.task);
        }
        goal.task = {};
      });
    };

    $scope.goalComplete = function(goal){
      var goalId = goal._id,
      index = _.indexOf($scope.goals, goal);
      Goal.goalComplete(goalId).then(function(response){
        $scope.user = response.data.user;
        $scope.goals.splice(index, 1);
      });
    };

    $scope.taskComplete = function(goal){
      Goal.update(goal).then(function(){
      },
      function(err){
        alert('Sorry, we aren\'t able to access the server at this time.');
      });
    };

  }]);
})();

