'use strict';

/**
 * @ngdoc function
 * @name front2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the front2App
 */
angular.module('front2App')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
