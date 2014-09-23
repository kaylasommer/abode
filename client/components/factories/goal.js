(function(){
  'use strict';

  angular.module('abode')
  .factory('Goal', ['$http', function($http){

    function create(goal){
      return $http.post('/goal', goal);
    }

    function index(){
      return $http.get('/goal');
    }

    return {create:create, index:index};
  }]);
})();

