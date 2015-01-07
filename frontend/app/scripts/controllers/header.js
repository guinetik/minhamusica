'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp')
  .controller('HeaderCtrl', function ($scope , auth) {
	$scope.isAuthenticated = auth.isAuthenticated(); 
});
