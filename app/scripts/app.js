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

    $httpBackend.whenPost('/trips').respond();
    $httpBackend.whenPost(/trips\/[0-9]*\/photos/).respond();

    $httpBackend.whenDelete(/trips\/[0-9]*/).respond(200, "The trip has been removed.");
    $httpBackend.whenDelete(/trips\/[0-9]*\/photos\/[0-9]*/).respond(200, "The photo has been removed.");

    $httpBackend.whenPut(/trips\/[0-9]*/).respond();
    $httpBackend.whenPut(/trips\/[0-9]*\/photos\/[0-9]*/).respond();
  }

  angular.module('triplog').service('DataFaker', function() {

    this.generateTrips = function(count) {
      var trips = [];
      for(var i = 0; i < count; i++) {
        trips.push({
          id: i,
          name: Faker.Address.streetName(),
          date: Faker.Date.past(),
          publishedDate: Faker.Date.future(),
          description: Faker.Lorem.sentences(),
          private: randomPrivate(),
          userid: this.tripUserId
        });
      }
      return trips;
    }

    this.generateTrip = function() {
      return this.generateTrips(1);
    }
    
    this.tripUserId = 1;
    this.generateTripId = Faker.random.number;
    this.generateTripPhotos = Faker.Image.cats;

    function randomPrivate() {
      var privacy = ['true', 'false'];
      return privacy[Math.floor(Math.random()*privacy.length)];
    }

  });  
}])