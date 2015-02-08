'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:NovoeventoCtrl
 * @description
 * # NovoeventoCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('NovoEventoCtrl', ['$scope', 'api', 'auth', '$state', '$rootScope', NovoEventoCtrl]);
function NovoEventoCtrl($scope, api, auth, $state, $rootScope) {
    $scope.$on('$viewContentLoaded', function (event) {
        var token = auth.getToken();
        if (token != "-1") {
            api.lookup(token, function (result) {
                if (result.status == 200) {
                    //inicializar controller
                    //api.getAlgumaCoisa();
                    // transmite dados do usuario
                    $scope.usuario = result.data;
                    $rootScope.$emit("user-lookup", $scope.usuario);
                } else {
                    $state.go("main");
                }
            });
        } else {
            $state.go("main");
        }
    });
}
