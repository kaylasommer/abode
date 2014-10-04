(function(){
  'use strict';

  angular.module('abode')
  .factory('Dashboard', ['$http', function($http){

    function findAll(){
      return $http.get('/dashboard');
    }

    function getRecommendations(houseId){
      return $http.get('house/'+houseId+'/recommendations');
    }

    return {findAll:findAll, getRecommendations:getRecommendations};
  }]);
})();

