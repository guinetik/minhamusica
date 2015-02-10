'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('HeaderCtrl', ['$scope', '$rootScope', 'auth', 'api', '$state', HeaderCtrl]);
function HeaderCtrl($scope, $rootScope, auth, api, $state) {
    $scope.isAuthenticated = auth.isAuthenticated();
    $scope.generos = [];
    $scope.user = null;
    //console.log("isAuthenticated", $scope.isAuthenticated);
    if ($scope.isAuthenticated) {
        var token = auth.getToken();
        auth.getUser(token);
    }
    $scope.logout = function () {
        auth.logout();
        $scope.isAuthenticated = false;
        $state.go("main");
    };
    $rootScope.$on("user-lookup", function (event, user) {
        console.log("user-lookup", user);
        $scope.user = user;
    });
    $rootScope.$on("search-query", function (event, q) {
        $scope.query = q;
    });
    $rootScope.$on("update-user-token", function (event, token) {
        //console.log("update-user-token", token);
        auth.setToken(token);
        $scope.isAuthenticated = auth.isAuthenticated();
        if (!$scope.isAuthenticated) {
            $state.go("main");
        }
        //console.log("update-user-token : isAuthenticated", $scope.isAuthenticated, auth.isAuthenticated());
        if (token != '-1') {
            var u = auth.getUser(token);
            $state.go("main");
        }
    });
    api.getGeneros(function (result) {
        if (result.status == 200) {
            $scope.generos = result.generos;
        }
    });
    $scope.searchCD = function () {
        $state.go("busca", {q: $scope.query});
    };
}
