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

tripLog.run(['$httpBackend', 'DataFaker', '$rootScope', 'ENV', function($httpBackend, DataFaker, $rootScope, ENV) {
  if(ENV === 'development') {
    $httpBackend.whenGet('/trips').respond();
    $httpBackend.whenGet(/trips\/[0-9]*/).respond();
    $httpBackend.whenGet(/trips\/[0-9]*\/photos/).respond();

    function generateID() { 
      var uniqueID;
      var date = new Date();
      var components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
      ];
      uniqueID = parseInt(components.join(""));
      uniqueID = (uniqueID * ((1 + Math.random()) * 0x10000)).toString(16); 
      return uniqueID;
    }

    $httpBackend.whenPost('/trips').respond(function(method, url, data) {
      var trip = JSON.parse(data);
      trip.id = generateID();
      return [200, trip];
    });
    $httpBackend.whenPost(/trips\/[0-9]*\/photos/).respond(function(method, url, data) {
      var photo = JSON.parse(data);
      photo.id = generateID;
      return [200, photo];
    });

    $httpBackend.whenDelete(/trips\/[0-9]*/).respond(200, "The trip has been removed.");
    $httpBackend.whenDelete(/trips\/[0-9]*\/photos\/[0-9]*/).respond(200, "The photo has been removed.");

    $httpBackend.whenPut(/trips\/[0-9]*/).respond(function(method, url, data) {
      var trip = JSON.parse(data);
      return [200, trip];
    });
    $httpBackend.whenPut(/trips\/[0-9]*\/photos\/[0-9]*/).respond(function(method, url, data) {
      var photo = JSON.parse(data);
      return [200, photo];
    });
  }
}])