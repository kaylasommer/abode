(function(){
  'use strict';

  angular.module('abode')
  .controller('BookCtrl', ['$scope', 'Book', function($scope, Book){
    $scope.page = {};
    $scope.pages = [];

    $scope.addPage = function(){
      Book.create($scope.page).then(function(response){
        console.log(response);
        if(response.status === 200){
          $scope.page = {};
          toastr.success('You succesfully added a page to your IdeaBook!');
        } else {
          toastr.error('Sorry something went wrong on our side.');
        }
      });
    };

    Book.getUsersPages().then(function(response){
      $scope.pages = response.data.pages;
    });

  }]);
})();

