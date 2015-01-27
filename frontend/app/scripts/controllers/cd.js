'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('CdCtrl', ['$scope', 'api', '$timeout', '$stateParams', CdCtrl]);
function CdCtrl($scope, api, $timeout, $stateParams) {
  $scope.cd = {};
  $scope.cd.id = $stateParams.id;
  $scope.$on('$viewContentLoaded', function (event) {
    $timeout(function () {
      api.getCD($scope.cd.id, function (result) {
        if (result.status == 200) {
          $scope.cd = result;
        }
      });
    });
  });
}
