(function(){
  'use strict';

  angular.module('abode')
  .factory('Dashboard', ['$http', function($http){

    function findAll(){
      return $http.get('/dashboard');
    }

    function getRecommendations(){
      return $http.get('dashboard/recommend');
    }

    return {findAll:findAll, getRecommendations:getRecommendations};
  }]);
})();

