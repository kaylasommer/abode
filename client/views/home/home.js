(function(){
  'use strict';

  angular.module('abode')
  .controller('HomeCtrl', ['$scope', '$location', 'User', function($scope, $location, User){
    //login________________________________________________
    $scope.user = {};

    function success(response){
      toastr.success('Successful login.');
      $location.path('/dashboard');
    }

    function failure(response){
      toastr.error('Error during login, try again.');
      $scope.user = {};
    }

    $scope.login = function(){
      User.login($scope.user).then(success, failure);
    };
    //register-----------------------------------------------
    $scope.newUser = {};

    function newSuccess(response){
      toastr.success('User successfully registered.');
      $location.path('/tutorial');
    }

    function newFailure(response){
      toastr.error('Error during user registration, try again.');
      $scope.newUser = {};
    }

    $scope.register = function(){
      User.register($scope.newUser).then(newSuccess, newFailure);
    };

  }]);
})();

