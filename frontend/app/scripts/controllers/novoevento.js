'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:NovoeventoCtrl
 * @description
 * # NovoeventoCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('NovoEventoCtrl', ['$scope', 'api', NovoEventoCtrl]);
function NovoEventoCtrl($scope, api) {
    $scope.$on('$viewContentLoaded', function (event) {
      // EQUIVALENTE AO READY DO JQUERY
      console.log("NovoEventoCtrl:viewContentLoaded");
    });
  }
