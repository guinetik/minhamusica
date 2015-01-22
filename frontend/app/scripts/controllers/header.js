'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('HeaderCtrl', ['$scope', '$rootScope', 'auth', 'api', '$state', HeaderCtrl]);
function HeaderCtrl($scope , $rootScope, auth, api, $state) {
  $scope.isAuthenticated = auth.isAuthenticated();
  $scope.generos = [];
  $scope.user = null;
  if($scope.isAuthenticated) {
    var token = auth.getToken();
    auth.getUser(token);
  }
  $scope.logout = function() {
    auth.logout();
    $scope.isAuthenticated = auth.isAuthenticated();
    $state.go("main");
  };
  $rootScope.$on("user-lookup", function (event, user) {
    $scope.user = user;
  });
  $rootScope.$on("update-user-token", function (event, token) {
    auth.setToken(token);
    var u = auth.getUser(token);
    $scope.isAuthenticated = auth.isAuthenticated();
    $state.go("main");
  });
  api.getGeneros(function(result) {
    console.log("result", result);
    if(result.status == 200) {
      $scope.generos = result.generos;
    }
  });
}
