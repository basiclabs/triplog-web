'use strict';

angular.module('triplog')
  .controller('TripIndexCtrl', function ($scope, Model) {
    var trips = Model.Trip.query(function(){
        $scope.trips = trips;
    });
  });
