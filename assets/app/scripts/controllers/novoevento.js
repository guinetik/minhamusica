'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:NovoeventoCtrl
 * @description
 * # NovoeventoCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('NovoEventoCtrl', ['$scope', 'api', 'auth', '$state', '$rootScope', '$timeout', 'toastr', '$stateParams', NovoEventoCtrl]);
function NovoEventoCtrl($scope, api, auth, $state, $rootScope, $timeout, toastr, $stateParams) {
    var d = new Date();
    $scope.evento = {
        inicio: d,
        fim: d
    };
    $scope.today = new Date().toISOString().split("T")[0];
    $scope.getDateString = function (datee) {
        if (datee) {
            var k = datee.toISOString().split("T")[0];
        } else k = $scope.today;
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
                            if ($stateParams.id) {
                                api.getEvent($stateParams.id, function (result) {
                                    console.log("getEvent", result);
                                    if (result.status == 200) {
                                        $scope.evento.nome = result.nome;
                                        $scope.evento.descricao = result.descricao;
                                        $scope.evento.local.name = result.local;
                                        $scope.evento.foto = result.foto;
                                        $scope.evento.id = $stateParams.id;
                                        $scope.foto = {dataUrl:'/public/img/' + result.foto, imagem:result.foto};
                                        $scope.evento.inicio = new Date(result.inicio);
                                        $scope.evento.fim = new Date(result.fim);
                                        $scope.getEstadoSelecionado(result.cidade.estado);
                                        $scope.getCidadeSelecionada(result.cidade.id);
                                    }
                                });
                            }
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
    $scope.submit = function () {
        var token = auth.getToken();
        if($stateParams.id!=null) {
            console.log("UpdateEvent");
            $scope.evento.id = $stateParams.id;
            api.updateEvent($scope.evento, token, function (result) {
                console.log("Result", result);
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
        } else {
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
        }
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
    $scope.getCidadeSelecionada = function (id) {
        angular.forEach($scope.evento.estadoSelecionado.cidades, function(c, key) {
            if(c.id == id) {
                $scope.evento.cidade = c;
            }
        });
    };
    $scope.getEstadoSelecionado = function (estado) {
        angular.forEach($scope.estados, function(e, key) {
            if(e.id == estado) {
                $scope.evento.estadoSelecionado = e;
            }
        });
    };
    $scope.isValidStartDate = function ($value) {
        return $value.getTime() > d.getTime();
    };
    $scope.isValidEndDate = function ($value) {
        return $value.getTime() > $scope.evento.inicio.getTime();
    };
    //4sq search & autocomplete
    $scope.searchPlaces = function () {
        if ($scope.evento.local && $scope.evento.cidade) {
            if ($scope.evento.local.name.length > 2) {
                api.searchPlace($scope.evento.local.name, $scope.evento.cidade, function (result) {
                    console.log("result", result);
                    if (result.status == 200) {
                        $scope.updateAutoComplete(result.response.venues);
                    }
                });
            }
        }
    };
    $scope.updateAutoComplete = function (venues) {
        if (!$scope.placesCollection) {
            $scope.placesCollection = new Bloodhound({
                datumTokenizer: function (d) {
                    return Bloodhound.tokenizers.whitespace(d.name);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: venues
            });
            // initialize the bloodhound suggestion engine
            $scope.placesCollection.initialize();
            // Typeahead options object
            $scope.typeaheadOptions = {
                highlight: true
            };
            // Single dataset example
            $scope.suggestions = {
                displayKey: 'name',
                source: $scope.placesCollection.ttAdapter()
            };
        } else {
            $scope.placesCollection.clear();
            angular.forEach(venues, function (venue, key) {
                console.log("venue", venue.id, venue.name);
                $scope.placesCollection.add(venue);
            });
        }
    };
    $scope.updateAutoComplete([{name: "B"}]);
}
