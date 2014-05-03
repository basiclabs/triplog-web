'use strict';

angular.module('triplog')
  .controller('HomeCtrl',['$http', '$scope', function ($http, $scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $http.put('/trips/1', {"nasd": 'gayyyyyyy'}).success(function(res) {
    	console.log(res);
    })
  }]);
