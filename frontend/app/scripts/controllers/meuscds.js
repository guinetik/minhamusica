'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:MeuscdsCtrl
 * @description
 * # MeuscdsCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('MeusCDsCtrl', ['$scope', 'api', MeusCDsCtrl]);
function MeusCDsCtrl($scope, api) {
    $scope.$on('$viewContentLoaded', function (event) {
      // EQUIVALENTE AO READY DO JQUERY
      console.log("MeusCDsCtrl:viewContentLoaded");
    });
  }
