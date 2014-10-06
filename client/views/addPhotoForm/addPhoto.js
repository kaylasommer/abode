(function(){
  'use strict';
  angular.module('abode')
  .controller('AddPhotoCtrl', ['$scope', '$modalInstance', 'Book', function($scope, $modalInstance, Book){

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

    $scope.ok = function(){
      $modalInstance.close();
    };

    $scope.cancel = function(){
      $modalInstance.dismiss('cancel');
    };
  }]);
})();
