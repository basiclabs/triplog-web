'use strict';

var tripLog = angular.module('triplog', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]);

tripLog.constant('ENV', 'development');

tripLog.config(['$routeProvider', '$provide', function ($routeProvider, $provide) {
  $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
  $routeProvider
  .when('/', {
    templateUrl: '/views/main.html',
    controller: 'HomeCtrl'
  })
  .when('/trips', {
    templateUrl: '/views/trips/index.html',
    controller: 'TripIndexCtrl'
  })
  .when('/trips/:id', {
    templateUrl: '/views/trips/show.html',
    controller: 'TripShowCtrl'
  })
  .when('/trips/:id/photos/:id', {
    templateUrl: '/views/photo/show.html',
    controller: 'PhotoCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);

tripLog.run(['$httpBackend', 'DataFaker', '$rootScope', 'ENV', function($httpBackend, DataFaker, $rootScope, ENV) {
  if(ENV === 'development') {
    $httpBackend.whenGET(/\/views/).passThrough();
    $httpBackend.whenGET(/\/api\/trips/).respond(DataFaker.generateTrips(10));
    $httpBackend.whenGET(/\/api\/trips\/[\d]/).respond(DataFaker.generateTrip());
    $httpBackend.whenGET(/\/api\/trips\/[\d]\/photos/).respond(DataFaker.generateTripPhotos(10));

    $httpBackend.whenPOST('/trips').respond(function(method, url, data) {
      var trip = JSON.parse(data);
      trip.id = Faker.random.number();
      return [200, trip];
    });
    $httpBackend.whenPOST(/trips\/[0-9]*\/photos/).respond(function(method, url, data) {
      var photo = JSON.parse(data);
      photo.id = Faker.random.number();
      return [200, photo];
    });

    $httpBackend.whenDELETE(/trips\/[0-9]*/).respond(200, 'The trip has been removed.');
    $httpBackend.whenDELETE(/trips\/[0-9]*\/photos\/[0-9]*/).respond(200, 'The photo has been removed.');

    $httpBackend.whenPUT(/trips\/[0-9]*/).respond(function(method, url, data) {
      var trip = JSON.parse(data);
      return [200, trip];
    });
    $httpBackend.whenPUT(/trips\/[0-9]*\/photos\/[0-9]*/).respond(function(method, url, data) {
      var photo = JSON.parse(data);
      return [200, photo];
    });
  }
}]);
