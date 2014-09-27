(function(){
  'use strict';

  angular.module('abode', ['ngRoute', 'LocalForageModule', 'ui.bootstrap', 'ui.sortable'])
  .config(['$routeProvider', '$httpProvider', '$localForageProvider', function($routeProvider, $httpProvider, $localForageProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/logout',   {templateUrl:'/views/logout/logout.html', controller:'LogoutCtrl'})
    .when('/dashboard',   {templateUrl:'/views/dashboard/dashboard.html', controller:'DashboardCtrl'})
    .when('/tutorial',   {templateUrl:'/views/tutorial/tutorial.html', controller:'TutorialCtrl'})
    .when('/book',   {templateUrl:'/views/book/book.html', controller:'BookCtrl'})
    .when('/goal',   {templateUrl:'/views/goal/goal.html', controller:'GoalCtrl'})
    .when('/specs',   {templateUrl:'/views/specs/specs.html', controller:'SpecsCtrl'})
    .otherwise({redirectTo:'/'});

    $httpProvider.interceptors.push('HttpInterceptor');
    $localForageProvider.config({name:'abode', storeName:'cache', version:1.0});
  }]);
})();

