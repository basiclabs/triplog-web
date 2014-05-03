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

angular.module('triplog').service('DataFaker', function() {

  this.generateTrips = function(count) {
    var trips = [];
    for(var i = 0; i < count; i++) {
      trips.push({
        id: Faker.random.number(),
        name: Faker.Address.streetName(),
        date: Faker.Date.past(1),
        publishedDate: Faker.Date.future(1),
        description: Faker.Lorem.sentences(),
        private: randomPrivate(),
        userid: Faker.random.number()
      });
    }
    return trips;
  };

  this.generateTrip = function() {
    return this.generateTrips(1);
  };

  this.generateTripPhotos = function(count) {

    var photos = [];
    for(var i = 0; i < count; i++) {
      photos.push({
        id: Faker.random.number(),
        caption: Faker.Lorem.sentences(),
        latitude: Faker.Address.latitude,
        longitude: Faker.Address.longitude,
        tripID: Faker.random.number(),
        date: Faker.Date.past(1),
        url: Faker.Image.cats()
      });
    }
    return photos;
  };

  function randomPrivate() {
    var privacy = ['true', 'false'];
    return privacy[Math.floor(Math.random()*privacy.length)];
  }

});

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
