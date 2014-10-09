(function(){
  'use strict';

  angular.module('abode')
  .controller('TutorialCtrl', ['$scope', 'Dashboard', 'Goal', 'User', '$location', function($scope, Dashboard, Goal, User, $location){

    $scope.oneAtATime = true;
    $scope.goals = [];
    $scope.goal = {};
    $scope.user = {};
    $scope.house = {};
    $scope.recommendations = {};
    $scope.subForm = {};
    $scope.possibleFeeds = [
      {name: 'Dwell on Kitchens', url: 'http://www.dwell.com/kitchens/feed'},
      {name: 'Dwell Articles', url: 'http://www.dwell.com/articles/feed'},
      {name: 'Mother Living: Your Natural Home', url:'http://www.motherearthliving.com/rss/blogs/your_natural_home.aspx'},
      {name: 'Style At Home', url: 'http://www.styleathome.com/feeds/editorial_feed.xml'},
      {name: 'House and Home: Design', url: 'http://houseandhome.com/rss/feeds/design'},
      {name: 'Inhabitant: Sustainable Design Innovation on Interiors', url: 'http://feeds.feedburner.com/inhabitat/interiors'}
    ];

    Dashboard.findAll().then(function(response){
      $scope.user = response.data.user;
      $scope.feeds = $scope.user.subscriptions;
      $scope.house = response.data.house;
      $scope.goals = response.data.goals;
      if($scope.goals !== undefined){
        Dashboard.getRecommendations($scope.house._id).then(function(response){
          $scope.recommendations = response.data.recommendations;
        });
      }
    });

    $scope.swivel = function(){
      $scope.status.open = !!!$scope.status.open;
    };

    $scope.subscribeUser = function(){
      User.subscribeToRss($scope.user).then(function(response){
        $scope.user = response.data.user;
        $scope.feeds = $scope.user.subscriptions;
        toastr.success('Awesome! We will have your feeds up shortly!');
        $location.path('/dashboard');
      });
    };

    $scope.toggleSubscribe = function(){
      $scope.subForm = !!!$scope.subForm;
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
