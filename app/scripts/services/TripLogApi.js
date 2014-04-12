'use strict';

angular.module('triplog.services').service(['$http', function() {
  /*this.somefunction = function() {

  };*/

  this.user = function(token) {
    var self = this;

    self.token = token;
    self.trips = [];
  }
}]);
