'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:MeuseventosCtrl
 * @description
 * # MeuseventosCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('MeusEventosCtrl', ['$scope', 'api', MeusEventosCtrl]);
function MeusEventosCtrl($scope, api) {
    $scope.$on('$viewContentLoaded', function (event) {
      // EQUIVALENTE AO READY DO JQUERY
      console.log("MeusEventosCtrl:viewContentLoaded");
    });
  };
