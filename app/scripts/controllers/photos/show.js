'use strict';

angular.module('triplog')
  .controller('PhotoShowCtrl', function ($scope, $http) {
    $http.get('/api/trips/1/photos').success(function(response){
      $scope.photo = response[0];
    });
  });
