'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:ConfigpasswordCtrl
 * @description
 * # ConfigpasswordCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('ConfigPasswordCtrl', ['$scope', 'api', 'auth', 'toastr', '$state', ConfigPasswordCtrl]);
function ConfigPasswordCtrl($scope, api, auth, toastr, $state) {
  $scope.usuario = {};
  $scope.submit = function() {
    var token = auth.getToken();
    api.updatePassword($scope.usuario, token, function(result){
      if(result.status == 200) {
        toastr.info(result.message);
        $state.go("main");
      } else {
        toastr.warning(result.message);
      }
    });
  };
}
