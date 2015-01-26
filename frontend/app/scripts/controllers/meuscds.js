'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:MeuscdsCtrl
 * @description
 * # MeuscdsCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('MeusCDsCtrl', ['$scope', 'api', 'auth', MeusCDsCtrl]);
function MeusCDsCtrl($scope, api, auth) {
  $scope.cds = [];
  $scope.$on('$viewContentLoaded', function (event) {
    var token = auth.getToken();
    api.getUserCollection(token, function (result) {
      if(result.status == 200) {
        $scope.cds = result.cds;
      }
    });
  });
}
