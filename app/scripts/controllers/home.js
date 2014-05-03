'use strict';

angular.module('triplog')
  .controller('HomeCtrl',['$http', '$scope', function ($http, $scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $http.get('/trips/1/photos').success(function(res) {
      console.log(res);
    });
  }]);
