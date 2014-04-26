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

tripLog.run(['$httpBackend', 'Datafaker', '$rootScope', 'ENV', function($httpBackend, Datafaker, $rootScope, ENV) {
  if(ENV === 'development') {
    $httpBackend.whenGet('/trips').respond();
    $httpBackend.whenGet(/trips\/[0-9]*/).respond();
    $httpBackend.whenGet(/trips\/[0-9]*\/photos/).respond();

    $httpBackend.whenPost('/trips').respond();
    $httpBackend.whenPost(/trips\/[0-9]*\/photos/)

    $httpBackend.whenDelete(/trips\/[0-9]*/).respond();
    $httpBackend.whenDelete(/trips\/[0-9]*\/photos\/[0-9]*/)

    $httpBackend.whenPut(/trips\/[0-9]*/).respond();
    $httpBackend.whenPut(/trips\/[0-9]*\/photos\/[0-9]*/).respond();
  }
}])