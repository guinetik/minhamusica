'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:ConfigsCtrl
 * @description
 * # ConfigsCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('ConfigsCtrl', ['$scope', 'api', ConfigsCtrl]);
function ConfigsCtrl($scope, api) {
    $scope.$on('$viewContentLoaded', function (event) {
      // EQUIVALENTE AO READY DO JQUERY
      console.log("ConfigsCtrl:viewContentLoaded");
    });
  }
