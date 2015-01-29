'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('LoginCtrl', ['$scope', 'api', 'toastr', LoginCtrl]);
function LoginCtrl($scope, api, toastr) {
  $scope.usuario = {
    email: '',
    senha: ''
  };
  $scope.origem = angular.copy($scope.usuario);
  $scope.submit = function () {
    api.login($scope.usuario, function(result) {
      if(result.status == 200) {
        toastr.success(result.message);
      } else {
        if(result.message) {
          toastr.warning(result.message.message);
        } else {
          toastr.warning("Ocorreu um erro, tente novamente.");
        }
      }
    });
  };
  $scope.reset = function () {
    $scope.usuario = angular.copy($scope.origem);
  }
}
