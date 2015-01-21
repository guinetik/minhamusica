'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('HeaderCtrl', ['$scope', '$rootScope', 'auth', '$state', HeaderCtrl]);
function HeaderCtrl($scope , $rootScope, auth, $state) {
  $scope.isAuthenticated = auth.isAuthenticated();
  $scope.logout = function() {
    auth.logout();
    $scope.isAuthenticated = auth.isAuthenticated();
    $state.go("main");
  };
  $rootScope.$on("update-user-token", function (event, token) {
    auth.setToken(token);
    $scope.isAuthenticated = auth.isAuthenticated();
    $state.go("main");
  });
}
