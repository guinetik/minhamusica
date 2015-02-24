'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:ConfigsCtrl
 * @description
 * # ConfigsCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('ConfigsCtrl', ['$rootScope', '$scope', 'api', 'auth', '$timeout', '$state', 'toastr', '$upload', ConfigsCtrl]);
function ConfigsCtrl($rootScope, $scope, api, auth, $timeout, $state, toastr, $upload) {
    $scope.usuario = {};
    $scope.capa = {};
    $scope.foto = {};
    $scope.estados = [];
    console.log($upload);
    $scope.$on('$viewContentLoaded', function (event) {
        var token = auth.getToken();
        $timeout(function () {
            api.lookup(token, function (result) {
                if (result.status == 200) {
                    var user = result.data;
                    api.getEstados(function (result) {
                        $scope.estados = result;
                        $scope.usuario.id = user.id;
                        $scope.usuario.capa = user.capa;
                        $scope.usuario.foto = user.foto;
                        $scope.usuario.nome = user.nome;
                        $scope.usuario.email = user.email;
                        $scope.usuario.twitter =user.twitter;
                        $scope.usuario.facebook =user.facebook;
                        $scope.usuario.about = user.about;
                        $scope.usuario.sexo = user.sexo;
                        $scope.usuario.instagram =user.instagram;
                        $scope.capa.dataUrl = $scope.capa.imagem = "/public/img/" + user.capa;
                        $scope.foto.dataUrl = $scope.foto.imagem = "/public/img/" + user.foto;
                        $scope.getEstadoSelecionado(user.cidade.estado);
                        $scope.getCidadeSelecionada(user.cidade.id);
                        $scope.usuario.nascimento = new Date(user.nascimento);
                        $rootScope.$emit("user-lookup", $scope.usuario);
                    });
                } else {
                    $state.go("main");
                }
            });
        });
    });
    $scope.getCidadeSelecionada = function (id) {
        angular.forEach($scope.estado.cidades, function(c, key) {
            if(c.id == id) {
                $scope.usuario.cidade = c;
            }
        });
    };
    $scope.getEstadoSelecionado = function (estado) {
        console.log("fowkefo", estado);
        angular.forEach($scope.estados, function(e, key) {
            console.log("estado", e.id, estado);
            if(e.id == estado) {
                $scope.estado = e;
            }
        });
    };
    $scope.submit = function () {
        var token = auth.getToken();
        api.updateProfile($scope.usuario, token, function (result) {
            if (result.status == 200) {
                $rootScope.$emit("user-lookup", result);
                toastr.success("Perfil atualizado");
            } else {
                toastr.error("Houve um erro ao atualizar o perfil.");
            }
        });
    };
    $scope.generateCoverThumb = function (file) {
        if (file != null) {
            console.log("capa nova", file);
            if (file.type.indexOf('image') > -1) {
                $scope.updateUserCover(file);
                $timeout(function () {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(file);
                    fileReader.onload = function (e) {
                        $timeout(function () {
                            console.log("capa nova", e.target.result);
                            $scope.capa.dataUrl = e.target.result;
                        });
                    }
                });
            }
        }
    };
    $scope.updateUserCover = function (file) {
        if ($scope.usuario.id != null) $scope.capa.user = $scope.usuario.id;
        var token = auth.getToken();
        api.updateUserCover(file, $scope.capa, token, function (data, status, headers, config) {
            if (status == 200) {
                toastr.info(data.message);
                $scope.usuario.capa = data.imagem;
                $rootScope.$emit("user-lookup", $scope.usuario);
            } else {
                toastr.warning(data.message);
            }
        });
    };
    $scope.updateUserFoto = function (file) {
        console.log("updateFoto");
        if ($scope.usuario.id != null) $scope.foto.user = $scope.usuario.id;
        var token = auth.getToken();
        api.updateUserFoto(file, $scope.foto, token, function (data, status, headers, config) {
            if (status == 200) {
                toastr.info(data.message);
                $scope.usuario.foto = data.imagem;
                $rootScope.$emit("user-lookup", $scope.usuario);
            } else {
                toastr.warning(data.message);
            }
        });
    };
    $scope.generateThumb = function (file) {
        console.log("foto nova", file);
        if (file != null) {
            if (file.type.indexOf('image') > -1) {
                $scope.updateUserFoto(file);
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
}
