'use strict';

angular.module('triplog').service('DataFaker', function() {

  this.generateTrips = function(count) {
    var trips = [];
    for(var i = 0; i < count; i++) {
      trips.push({
        id: Faker.random.number(1000),
        name: Faker.Address.streetName(),
        date: Faker.Date.past(1),
        publishedDate: Faker.Date.future(1),
        description: Faker.Lorem.sentences(),
        private: randomPrivate(),
        userid: Faker.random.number(1000)
      });
    }
    return trips;
  };

  this.generateTrip = function() {
    return this.generateTrips(1)[0];
  };

  this.generateTripPhotos = function(count) {

    var photos = [];
    for(var i = 0; i < count; i++) {
      photos.push({
        id: Faker.random.number(1000),
        caption: Faker.Lorem.sentences(),
        latitude: Faker.Address.latitude,
        longitude: Faker.Address.longitude,
        tripID: Faker.random.number(1000),
        date: Faker.Date.past(1),
        url: Faker.Image.imageUrl(800, 500, 'cats')
      });
    }
    return photos;
  };

  function randomPrivate() {
    var privacy = ['true', 'false'];
    return privacy[Math.floor(Math.random()*privacy.length)];
  }

});
