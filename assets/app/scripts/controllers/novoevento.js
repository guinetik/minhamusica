'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:NovoeventoCtrl
 * @description
 * # NovoeventoCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('NovoEventoCtrl', ['$scope', 'api', 'auth', '$state', '$rootScope', '$timeout', 'toastr', NovoEventoCtrl]);
function NovoEventoCtrl($scope, api, auth, $state, $rootScope, $timeout, toastr) {
    var d = new Date();
    $scope.evento = {
        inicio:d,
        fim:d
    };
    $scope.today = new Date().toISOString().split("T")[0];
    $scope.getDateString = function(datee) {
        if(datee) {
            var k = datee.toISOString().split("T")[0];
        } else k  = $scope.today;
        return k;
    };
    $scope.$on('$viewContentLoaded', function (event) {
        $timeout(function () {
            var token = auth.getToken();
            if (token != "-1") {
                api.lookup(token, function (result) {
                    if (result.status == 200) {
                        //inicializar controller
                        api.getEstados(function (result) {
                            $scope.estados = result;
                        });
                        // transmite dados do usuario
                        $scope.usuario = result.data;
                        $scope.evento.usuario = $scope.usuario.id;
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
    $scope.submit = function() {
        var token = auth.getToken();
        api.addEvento(token, $scope.evento, function (result) {
            if (result.status == 200) {
                toastr.success(result.message);
                $state.go("meus_eventos");
            } else {
                console.log("error", result);
                if (result.message != null) {
                    toastr.warning(result.message);
                } else {
                    toastr.warning("Ocorreu um erro ao salvar o evento:" + result.status);
                }
            }
        });
    };
    $scope.updateEventPicture = function (file) {
        console.log("updateEventPicture");
        if ($scope.evento.id != null) $scope.foto.evento = $scope.evento.id;
        var token = auth.getToken();
        api.updateEventPicture(file, $scope.foto, token, function (data, status, headers, config) {
            if (status == 200) {
                toastr.info(data.message);
                $scope.evento.foto = data.imagem;
            } else {
                toastr.warning(data.message);
            }
        });
    };
    $scope.generateThumb = function (file) {
        console.log("foto nova", file);
        if (file != null) {
            if (file.type.indexOf('image') > -1) {
                $scope.updateEventPicture(file);
                $timeout(function () {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = function (e) {
                        $timeout(function () {
                            $scope.foto.dataUrl = e.target.result;
                            console.log("foto nova", e.target.result);
                        });
                    }
                });
            }
        }
    };
    $scope.isValidStartDate = function($value) {
        return $value.getTime() > d.getTime();
    };
    $scope.isValidEndDate = function($value) {
        return $value.getTime() > $scope.evento.inicio.getTime();
    };
}
