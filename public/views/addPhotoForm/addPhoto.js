(function(){
  'use strict';
  angular.module('abode')
  .controller('AddPhotoCtrl', ['$scope', '$modalInstance', 'Book', function($scope, $modalInstance, Book){
    $scope.page = {};

    $scope.addPage = function(){
      Book.create($scope.page).then(function(response){
        $modalInstance.close(response.data);
        if(response.status === 200){
          toastr.success('You succesfully added a page to your IdeaBook! Your photo will load on refresh.');
        } else {
          toastr.error('Sorry something went wrong on our side.');
        }
      });
    };

    $scope.cancel = function(){
      $modalInstance.dismiss('cancel');
    };
  }]);
})();
