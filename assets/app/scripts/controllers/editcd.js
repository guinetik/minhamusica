'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:EditcdCtrl
 * @description
 * # EditcdCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('EditCDCtrl', ['$scope', 'cd', '$stateParams', EditCDCtrl]);
function EditCDCtrl($scope, cd, $stateParams) {
    $scope.cd = {};
    $scope.musicas = [];
    $scope.generos = [];
    $scope.capas = [];
    $scope.capa = {};
    $scope.view = "basic";
    $scope.pendingChanges = false;
    cd.scope = $scope;
    $scope.sortOptions = cd.sortOptions;
    $scope.cd.id = $stateParams.id;
    $scope.title = "EDITAR CD";
    $scope.toggleState = function (view) {
        if ($scope.cd.saved) {
            $scope.view = view;
        }
    };
    $scope.generateThumb = function (file) {
        cd.generateThumb($scope, file);
        $scope.pendingChanges = true;
    };
    $scope.updateCover = function (file) {
        cd.updateCover($scope, file);
        $scope.pendingChanges = true;
    };
    $scope.fileDropped = function ($files, $event, $rejectedFiles) {
        cd.fileDropped($scope, $files, $event, $rejectedFiles);
        $scope.pendingChanges = true;
    };
    $scope.deleteMusic = function (musica) {
        cd.deleteMusic($scope, musica);
        $scope.pendingChanges = true;
    };
    $scope.submit = function () {
        cd.update($scope);
        $scope.pendingChanges = true;
    };
    $scope.salvarCd = function () {
        cd.saveCd($scope);
    };
    $scope.updateMusic = function (music) {
        cd.updateMusic($scope, music);
        $scope.pendingChanges = true;
    };
    $scope.$on('$viewContentLoaded', function (event) {
        cd.getCd($scope);
    });
    $scope.addToPlaylist = function (song) {
        cd.addToPlaylist($scope, song);
    }
}
