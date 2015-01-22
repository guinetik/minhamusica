'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:ConfigpasswordCtrl
 * @description
 * # ConfigpasswordCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('ConfigPasswordCtrl', ['$scope', 'api', ConfigPasswordCtrl]);
function ConfigPasswordCtrl($scope, api) {
    $scope.$on('$viewContentLoaded', function (event) {
      // EQUIVALENTE AO READY DO JQUERY
      console.log("ConfigPasswordCtrl:viewContentLoaded");
    });
  }
