'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('CdCtrl', ['$scope', 'api', '$timeout', '$stateParams', '$rootScope', 'toastr', CdCtrl]);
function CdCtrl($scope, api, $timeout, $stateParams, $rootScope, toastr) {
    $scope.cd = {artista:{id:0}};
    $scope.eventos =[];
    $scope.related = [];
    $scope.cd.id = $stateParams.id;
    $scope.$on('$viewContentLoaded', function (event) {
        $timeout(function () {
            api.getCD($scope.cd.id, function (result) {
                if (result.status == 200) {
                    $scope.cd = result.cd;
                    $scope.eventos = result.eventos;
                    $scope.related = result.related;
                }
            });
        });
    });
    $scope.downloadCD = function () {
        api.downloadCD($scope.cd.id, function (result) {
            console.log("downloadCD", result);
            if (result.status == 200) {
                toastr.info(result.message);
                window.open(result.url);
            } else {
                if (result.message) {
                    toastr.warning(result.message);
                } else {
                    toastr.warning("Houve um erro. tente novamente");
                }
            }
        });
    };
    $scope.addToPlaylist = function (musica) {
        musica.cd = $scope.cd;
        $rootScope.$emit("add-to-playlist", musica);
    };
    $scope.addAll = function () {
        $rootScope.$emit("add-cd-to-playlist", $scope.cd);
    };
    $scope.shareSong = function (song) {
        alert("SHARE");
    };
    $scope.downloadSong = function (song) {
        console.log("song", song);
        api.downloadMusic(song, function (result) {
            console.log("downloadMusic", result);
            if (result.status == 200) {
                toastr.info(result.message);
                window.open(result.url);
            } else {
                if (result.message) {
                    toastr.warning(result.message);
                } else {
                    toastr.warning("Houve um erro. tente novamente");
                }
            }
        });
    };
}
