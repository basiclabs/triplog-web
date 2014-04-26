'use strict';

var tripLog = angular.module('triplog', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]);

tripLog.constant('ENV', 'development');

tripLog.config(['$provide', function ($routeProvider, $provide) {
  $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
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
