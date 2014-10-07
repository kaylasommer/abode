(function(){
  'use strict';
  angular.module('abode')
  .directive('kjParse', ['$http', '$interval', '$q', function($http, $interval, $q){

    var parseRSS = function(url){
      return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
    },

    parseEntry = function(el){
      return {
        title : el.title,
        content : el.content || el.description,
        date : el.publishedDate ||el.pubDate,
        link : el.link,
        shortLink : hostname(el.link)
      };
    },

    hostname = function(){
      var a = document.createElement('a');
      return function(url){
        a.href = url;
        return a.hostname;
      };
    },

    updateModel = function(url){
      return $q(function(resolve, reject){
        parseRSS(url).then(function(data){
          if(data === null){
            return;
          }
          var entries = _.map(data.data.responseData.feed.entries, function(el){
            return parseEntry(el);
          });
          console.log('entries in update model>>', entries);
          resolve(entries);
        });
      });
    };

    return {
      restrict: 'E',
      replace: true,
      scope: {
        feeds: '='
      },
      templateUrl: 'components/directives/kj-parse/kj-parse.html',
      link: function(scope, elem, attrs, fn){
        scope.$watch('feeds', function(value){
          if(value && value.length > 0){
            scope.articles = [];
            _.each(value, function(url){
              console.log('URL in link each fn', url);
              updateModel(url).then(function(articles){
                console.log('after updateModel', articles);
                scope.articles = scope.articles.concat(articles);
                scope.articles = _.shuffle(scope.articles);
                console.log('after shuffle', scope.articles);
              });
            });
          }
        });
      }

    };
  }]);
    // update initially

    //then update every 30 secs
    // $interval(function() {
      // if ($scope.rssFeedFocused) {
        // $scope.updateModel();
      // }
    // }, 30000);*/
})();
