'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:NovocdCtrl
 * @description
 * # NovocdCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('NovoCDCtrl', ['$scope', 'api', NovoCDCtrl]);
function NovoCDCtrl($scope, api) {
  $scope.$on('$viewContentLoaded', function (event) {
    // EQUIVALENTE AO READY DO JQUERY
    console.log("NovoCDCtrl:viewContentLoaded");
  });
}
