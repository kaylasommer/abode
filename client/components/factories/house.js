(function(){
  'use strict';

  angular.module('abode')
  .factory('House', ['$http', function($http){

    function create(house){
      var fd = new FormData();
      fd.append('photo', house.photo);
      fd.append('loc', house.loc);
      return $http.post('/house', fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      });
    }

    function getUsersHouse(){
      return $http.get('/house');
    }

    function update(houseId, house){
      return $http.put('/house/' + houseId, house);
    }

    return{create:create, getUsersHouse:getUsersHouse, update:update};
  }]);
})();
