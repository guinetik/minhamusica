'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:MeuscdsCtrl
 * @description
 * # MeuscdsCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('MeusCDsCtrl', ['$scope', 'api', 'auth', 'toastr', '$timeout', '$rootScope', '$state', MeusCDsCtrl]);
function MeusCDsCtrl($scope, api, auth, toastr, $timeout, $rootScope, $state) {
    $scope.cds = [];
    var token = auth.getToken();
    $scope.$on('$viewContentLoaded', function (event) {
        console.log("token", token);
        if (token != "-1") {
            api.lookup(token, function (result) {
                if (result.status == 200) {
                    //inicializar controller
                    $timeout($scope.updateCollection);
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
