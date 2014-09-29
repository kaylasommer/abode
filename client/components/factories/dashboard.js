(function(){
  'use strict';

  angular.module('abode')
  .factory('Dashboard', ['$http', function($http){

    function findAll(){
      return $http.get('/dashboard');
    }

    return {findAll:findAll};
  }]);
})();

