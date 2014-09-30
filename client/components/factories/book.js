(function(){
  'use strict';

  angular.module('abode')
  .factory('Book', ['$http', function($http){

    function create(page){
      var fd = new FormData();
      fd.append('photo', page.photo);
      fd.append('desc', page.desc);
      return $http.post('/book', fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      });
    }

    function getUsersPages(){
      return $http.get('/book');
    }

    return{create:create, getUsersPages:getUsersPages};
  }]);
})();

