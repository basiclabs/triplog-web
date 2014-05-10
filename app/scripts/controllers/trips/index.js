'use strict';

angular.module('triplog')
  .controller('TripIndexCtrl', function ($scope, $http) {
    $http.get('/api/trips').success(function(response){
      $scope.trips = response;
    });
  });
