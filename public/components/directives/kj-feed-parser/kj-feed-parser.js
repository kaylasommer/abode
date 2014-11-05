(function(){
  'use strict';

  /*angular.module('abode')
  .controller('kjFeedParser', ['$http', '$interval', '$scope', function($http, $interval, $scope) {
    $scope.articles = [ ];
    $scope.rssFeed = 'http://hnapp.com/api/items/rss/a817dd49f3fe75b6fc2764bd98b714f7';
    $scope.originalRssFeed = 'http://hnapp.com/api/items/rss/a817dd49f3fe75b6fc2764bd98b714f7';

    $scope.existingArticles = function() {
      return _.find($scope.articles, function(a) { return !a.cleared}) != null;
    };

    $scope.allAreRead = function() {
      return _.every($scope.articles, function(a) { return a.read; });
    };

    $scope.showOrHideAll = function() {
      var markAsHide = _.every($scope.articles, function(a) { return a.show; });
      _.each($scope.articles, function(el, index, list) { el.show = !markAsHide; });
    };

    $scope.clearCompleted = function () {
      _.each(_.where($scope.articles, { read: true }), function(a) { a.cleared = true; });
    };

    $scope.markAll = function() {
      var markAsUnread = $scope.allAreRead();
      _.each($scope.articles, function(el, index, list) { el.read = !markAsUnread; });
    };

    var hostname = (function () {
      var a = document.createElement('a');
      return function (url) {
      a.href = url;
      return a.hostname;
      }
    })();
    var parseEntry = function(el) {
      return {
        title     : el.title,
        content   : el.content || el.description,
        read      : false,
        date      : el.publishedDate || el.pubDate,
        link      : el.link,
        shortLink : hostname(el.link)
      };
    };

    var parseRSS = function(url) {
      return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
    };

    $scope.updateModel = function() {
      parseRSS($scope.rssFeed)
      .then(function(data) {
        if (data == null) {
          return;
        }

        var mostRecentDate = null;
        if ($scope.articles.length && $scope.rssFeed == $scope.originalRssFeed) {
          mostRecentDate = $scope.articles[0].date;
        }

        var entries = _.map(data.data.responseData.feed.entries, function(el) { return parseEntry(el); });

        if (mostRecentDate != null) {
          entries = _.filter(entries, function(el) { return el.date < mostRecentDate; });
        }

        if ($scope.rssFeed != $scope.originalRssFeed) {
          $scope.articles = entries;
          $scope.originalRssFeed = $scope.rssFeed;
        } else {
          $scope.articles = _.union($scope.articles, entries);
        }

        $scope.articles = _.sortBy($scope.articles, function(el) { return el.date; });
      });
    };
    // update initially
    $scope.updateModel();

    //then update every 30 secs
    $interval(function() {
      if ($scope.rssFeedFocused) {
        $scope.updateModel();
      }
    }, 30000);*/
})();
