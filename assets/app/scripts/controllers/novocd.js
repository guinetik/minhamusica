'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:NovocdCtrl
 * @description
 * # NovocdCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('NovoCDCtrl', ['$scope', 'cd', 'api', 'auth', '$state', '$rootScope',  NovoCDCtrl]);
function NovoCDCtrl($scope, cd, api, auth, $state, $rootScope) {
    $scope.cd = {
        musicas: []
    };
    $scope.generos = [];
    $scope.files = [];
    $scope.capas = [];
    $scope.capa = {};
    cd.scope = $scope;
    $scope.sortOptions = cd.sortOptions;
    $scope.view = "basic";
    $scope.title = "NOVO CD";
    $scope.toggleState = function (view) {
        if ($scope.cd.saved) {
            $scope.view = view;
        }
    };
    $scope.$on('$viewContentLoaded', function (event) {
        var token = auth.getToken();
        if (token != "-1") {
            api.lookup(token, function (result) {
                if (result.status == 200) {
                    //inicializar controller
                    cd.getGeneros($scope);
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
    $scope.generateThumb = function (file) {
        cd.generateThumb($scope, file);
    };
    $scope.updateCover = function (file) {
        cd.updateCover($scope, file);
    };
    $scope.fileDropped = function ($files, $event, $rejectedFiles) {
        cd.fileDropped($scope, $files, $event, $rejectedFiles);
    };
    $scope.deleteMusic = function (musica) {
        cd.deleteMusic($scope, musica)
    };
    $scope.submit = function () {
        console.log("cd", $scope.cd);
        cd.create($scope);
    };
    $scope.salvarCd = function () {
        cd.saveCd($scope);
    };
    $scope.updateMusic = function (music) {
        cd.updateMusic($scope, music);
    };
    $scope.addToPlaylist = function (song) {
        cd.addToPlaylist($scope, song);
    }
}
