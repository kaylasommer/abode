(function(){
  'use strict';

  angular.module('abode', ['ngRoute', 'LocalForageModule', 'ui.bootstrap', 'ui.sortable', 'ngSanitize'])
  .config(['$routeProvider', '$httpProvider', '$localForageProvider', function($routeProvider, $httpProvider, $localForageProvider){
    $routeProvider
    .when('/', {templateUrl:'/views/home/home.html', controller:'HomeCtrl'})
    .when('/logout',   {templateUrl:'/views/logout/logout.html', controller:'LogoutCtrl'})
    .when('/dashboard',   {templateUrl:'/views/dashboard/dashboard.html', controller:'DashboardCtrl'})
    .when('/tutorial',   {templateUrl:'/views/tutorial/tutorial.html', controller:'TutorialCtrl'})
    .when('/book',   {templateUrl:'/views/book/book.html', controller:'BookCtrl'})
    .when('/edit',   {templateUrl:'/views/edit/edit.html', controller:'EditCtrl'})
    .when('/house',   {templateUrl:'/views/house/house.html', controller:'HouseCtrl'})
    .when('/general/:houseId',   {templateUrl:'/views/general/general.html', controller:'GeneralCtrl'})
    .when('/extras/:houseId',   {templateUrl:'/views/extras/extras.html', controller:'ExtrasCtrl'})
    .when('/systems/:houseId',   {templateUrl:'/views/systems/systems.html', controller:'SystemsCtrl'})
    .when('/kitchen/:houseId',   {templateUrl:'/views/kitchen/kitchen.html', controller:'KitchenCtrl'})
    .when('/bathroom/:houseId',   {templateUrl:'/views/bathroom/bathroom.html', controller:'BathroomCtrl'})
    .when('/livingroom/:houseId',   {templateUrl:'/views/livingroom/livingroom.html', controller:'LivingroomCtrl'})
    .when('/laundry/:houseId',   {templateUrl:'/views/laundry/laundry.html', controller:'LaundryCtrl'})
    .when('/dining/:houseId',   {templateUrl:'/views/dining/dining.html', controller:'DiningCtrl'})
    .when('/bedroomOne/:houseId',   {templateUrl:'/views/bedroomOne/bedroomOne.html', controller:'BedroomOneCtrl'})
    .when('/bedroomTwo/:houseId',   {templateUrl:'/views/bedroomTwo/bedroomTwo.html', controller:'BedroomTwoCtrl'})
    .otherwise({redirectTo:'/'});

    $httpProvider.interceptors.push('HttpInterceptor');
    $localForageProvider.config({name:'abode', storeName:'cache', version:1.0});
  }]);
})();
