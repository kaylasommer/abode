(function(){
  'use strict';

  angular.module('abode')
  .factory('House', ['$http', function($http){

    function create(house){
      return $http.post('/house', house);
    }
    return{create:create};
  }]);
})();


