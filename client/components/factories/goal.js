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

    function goalComplete(goalId){
      return $http.delete('/goal/' + goalId);
    }

    function update(goal){
      return $http.put('/goal/' + goal._id, {goal:goal});
    }

    return {create:create, index:index, add:add, goalComplete:goalComplete, update:update};
  }]);
})();

