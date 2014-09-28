(function(){
  'use strict';

  angular.module('abode')
  .factory('User', ['$http', function($http){

    function register(user){
      return $http.post('/register', user);
    }

    function login(user){
      return $http.post('/login', user);
    }

    function logout(){
      return $http.delete('/logout');
    }

    function getCurrent(){
      return $http.get('/user');
    }

    return {register:register, login:login, logout:logout, getCurrent:getCurrent};
  }]);
})();

