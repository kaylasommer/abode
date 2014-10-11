(function(){
  'use strict';

  angular.module('abode')
  .controller('BookCtrl', ['$scope', 'Book', '$modal', function($scope, Book, $modal){
    $scope.page = {};

    $scope.open = function(size){

      var modalInstance = $modal.open({
        templateUrl: '/views/addPhotoForm/addPhoto.html',
        controller: 'AddPhotoCtrl',
        size: size
      });

      modalInstance.result.then(function(page){
        $scope.page = page;
      });
    };

    Book.getUsersPages().then(function(response){
      $scope.pages = response.data.pages;
    });

  }]);
})();

