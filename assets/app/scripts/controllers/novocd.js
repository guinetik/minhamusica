'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:NovocdCtrl
 * @description
 * # NovocdCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('NovoCDCtrl', ['$scope', 'cd', NovoCDCtrl]);
function NovoCDCtrl($scope, cd) {
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
        cd.getGeneros($scope);
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
