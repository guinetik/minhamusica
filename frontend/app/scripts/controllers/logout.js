'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp')
  .controller('LogoutCtrl', function ($scope, auth) {
    $scope.logout = function(){
		console.log('chamou');
		auth.logout();
		//location.go('/');
	}

  });
