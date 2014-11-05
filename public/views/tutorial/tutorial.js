(function(){
  'use strict';

  angular.module('abode')
  .controller('TutorialCtrl', ['$scope', 'Dashboard', 'Goal', 'User', '$location', '$modal', function($scope, Dashboard, Goal, User, $location, $modal){
    $scope.tutorial = true;
    $scope.oneAtATime = true;
    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
    $scope.goals = [];
    $scope.goal = {};
    $scope.user = {};
    $scope.house = {};
    $scope.recommendations = {};
    $scope.subForm = {};
    $scope.subForm = false;
    $scope.possibleFeeds = [
      {name: 'Dwell on Kitchens', url: 'http://www.dwell.com/kitchens/feed'},
      {name: 'Dwell Articles', url: 'http://www.dwell.com/articles/feed'},
      {name: 'Mother Living: Your Natural Home', url:'http://www.motherearthliving.com/rss/blogs/your_natural_home.aspx'},
      {name: 'Style At Home', url: 'http://www.styleathome.com/feeds/editorial_feed.xml'},
      {name: 'House and Home: Design', url: 'http://houseandhome.com/rss/feeds/design'},
      {name: 'Inhabitant: Sustainable Design Innovation on Interiors', url: 'http://feeds.feedburner.com/inhabitat/interiors'}
    ];

    $scope.open = function(size){

      $modal.open({
        templateUrl: '/views/tutorialModal/tutorialModal.html',
        controller: 'TutorialModalCtrl',
        size: size
      });

    };

    $scope.tasks = [
      'This is Task One',
      'This is Task Two',
      'This is Task Three'
    ];

    $scope.otherTasks = [
      'Measure current screens.',
      'Order the screens from local Home Improvement Store.',
      'Replace all the screens.',
      'Recycle old screens.'
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

    $scope.subscribeUser = function(){
      User.subscribeToRss($scope.user).then(function(response){
        $scope.user = response.data.user;
        $scope.feeds = $scope.user.subscriptions;
        toastr.success('Awesome! We will have your feeds up shortly!');
        $location.path('/dashboard');
      });
    };

    $scope.sortableOptions = {
      stop: function(e, ui){
        var goal = ui.item.scope().$parent.$parent.goal;
        Goal.update(goal).then(function(){
        });
      }
    };

  }]);
})();
