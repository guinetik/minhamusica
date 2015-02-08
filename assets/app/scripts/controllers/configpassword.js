'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:ConfigpasswordCtrl
 * @description
 * # ConfigpasswordCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('ConfigPasswordCtrl', ['$scope', 'api', 'auth', 'toastr', '$state', '$rootScope', ConfigPasswordCtrl]);
function ConfigPasswordCtrl($scope, api, auth, toastr, $state, $rootScope) {
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
    $scope.submit = function () {
        var token = auth.getToken();
        api.updatePassword($scope.usuario, token, function (result) {
            if (result.status == 200) {
                toastr.info(result.message);
                $state.go("main");
            } else {
                toastr.warning(result.message);
            }
        });
    };
}
