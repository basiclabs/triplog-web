'use strict';

var tripLog = angular.module('triplog', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]);

tripLog.config(function ($routeProvider, $provide) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'HomeCtrl'
    })
    .when('/trips', {
      templateUrl: 'views/trips/index.html',
      controller: 'TripIndexCtrl'
    })
    .when('/trips/:id', {
      templateUrl: 'views/trips/show.html',
      controller: 'TripShowCtrl'
    })
    .when('/trips/:id/photos/:id', {
      templateUrl: 'views/photo/show.html',
      controller: 'PhotoCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
