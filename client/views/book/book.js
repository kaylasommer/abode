(function(){
  'use strict';

  angular.module('abode')
  .controller('BookCtrl', ['$scope', 'Book', '$modal', function($scope, Book, $modal){
    $scope.page = {};

    $scope.open = function(size){

      $modal.open({
        templateUrl: '/views/addPhotoForm/addPhoto.html',
        controller: 'AddPhotoCtrl',
        size: size
      });
    };

    Book.getUsersPages().then(function(response){
      $scope.pages = response.data.pages;
    });

  }]);
})();

