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
      controller: 'MainCtrl'
    })
    .when('/trips', {
      templateUrl: 'views/trips.html',
      controller: 'TripsCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
