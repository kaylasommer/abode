(function(){
  'use strict';

  angular.module('abode')
  .directive('kjTrending', ['Tweets', function(Tweets){

    return {
      restrict: 'E',
      scope: {
      },
      templateUrl: '/components/directives/kj-trending/kj-trending.html',
      link: function(scope, elem, attrs, fn){
        scope.tweets = [];

        Tweets.onTweet(function(tweet){
          scope.tweets.push(tweet);
          var newTweet = angular.element('<li>'+ tweet.text +' <span class="author">'+tweet.screenName+'</span></li>');
          elem.find('ul').prepend(newTweet);
        });
      }
    };
  }]);
})();
