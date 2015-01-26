'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:MeuscdsCtrl
 * @description
 * # MeuscdsCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('MeusCDsCtrl', ['$scope', 'api', 'auth', 'toastr','$timeout', MeusCDsCtrl]);
function MeusCDsCtrl($scope, api, auth, toastr, $timeout) {
  $scope.cds = [];
  var token = auth.getToken();
  $scope.$on('$viewContentLoaded', function (event) {
    $timeout($scope.updateCollection);
  });
  $scope.updateCollection = function () {
    api.getUserCollection(token, function (result) {
      if (result.status == 200) {
        $scope.cds = result.cds;
      }
    });
  };
  $scope.deleteCd = function (cd) {
    api.deleteCd(cd, token, function (result) {
      if (result.status == 200) {
        toastr.info("CD Excluído");
        $scope.updateCollection();
      } else {
        toastr.warning("Houve um erro ao excluir o cd");
      }
    });
  }
}
