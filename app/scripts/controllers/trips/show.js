'use strict';

angular.module('triplog')
  .controller('TripShowCtrl', function ($scope, $http) {
    $http.get('/api/trips/1').success(function(response){
      $scope.trip = response;
    });
  });
