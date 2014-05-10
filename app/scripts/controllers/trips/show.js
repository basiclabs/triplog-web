'use strict';

angular.module('triplog')
  .controller('TripShowCtrl', function ($scope, $http, Model) {


    var trip = Model.Trip.get({id: 1}, function(){
        $scope.trip = trip;
    });
  });
