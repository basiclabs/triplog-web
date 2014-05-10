'use strict';

angular.module('triplog').service('Model', ['$resource', function($resource) {
  this.Trip = $resource('/api/trips/:id', {id:'@id'});
}]);
