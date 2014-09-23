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

    function add(task){
      return $http.post('/task', task);
    }

    return {create:create, index:index, add:add};
  }]);
})();

