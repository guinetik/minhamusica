'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:MeuseventosCtrl
 * @description
 * # MeuseventosCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('MeusEventosCtrl', ['$scope', 'api', 'auth', '$state', '$rootScope', '$timeout', 'toastr', MeusEventosCtrl]);
function MeusEventosCtrl($scope, api, auth, $state, $rootScope, $timeout, toastr) {
    $scope.eventos = [];
    var token = auth.getToken();
    $scope.$on('$viewContentLoaded', function (event) {
        $timeout(function () {
            if (token != "-1") {
                api.lookup(token, function (result) {
                    if (result.status == 200) {
                        //inicializar controller
                        $timeout($scope.updateEvents);
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
    });
    $scope.updateEvents = function () {
        api.getUserEvents(token, function (result) {
            if (result.status == 200) {
                $scope.eventos = result.eventos;
                console.log("eventos", $scope.eventos);
            } else {
                toastr.warning(result.message);
            }
        });
    };
    $scope.deleteEvent = function (event) {
        api.deleteEvent(event, token, function (result) {
            if (result.status == 200) {
                toastr.info("Evento Excluído");
                $scope.updateEvents();
            } else {
                toastr.warning("Houve um erro ao excluir o evento");
            }
        });
    }
}
