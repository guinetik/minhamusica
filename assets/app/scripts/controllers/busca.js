/**
 * Created by guinetik on 2/1/15.
 */
'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:BuscaCtrl
 * @description
 * # MeuscdsCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('BuscaCtrl', ['$scope', 'api', 'toastr', '$timeout', '$stateParams', '$rootScope', BuscaCtrl]);
function BuscaCtrl($scope, api, toastr, $timeout, $stateParams, $rootScope) {
    $scope.cds = [];
    $scope.eventos = [];
    $scope.musicas = [];
    $scope.$on('$viewContentLoaded', function (event) {
        $timeout($scope.searchCD);
    });
    $scope.searchCD = function () {
        var q = $stateParams.q;
        if (q != null) {
            $rootScope.$emit("search-query", q);
            api.searchCD(q, function (result) {
                if (result.status == 200) {
                    $scope.cds = result.cds;
                    $scope.eventos = result.eventos;
                    $scope.musicas = result.musicas;
                }
            });
        }
    };
    $scope.addToPlaylist = function (musica, cd) {
        musica.cd = cd;
        $rootScope.$emit("add-to-playlist", musica);
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
