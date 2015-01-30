'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:PainelCtrl
 * @description
 * # PainelCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('PainelCtrl', ['$scope', 'api', PainelCtrl]);
function PainelCtrl($scope, api) {
  $scope.$on('$viewContentLoaded', function (event) {
    // EQUIVALENTE AO READY DO JQUERY
    console.log("PainelCtrl:viewContentLoaded");
  });
}
