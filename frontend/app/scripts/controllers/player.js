'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('PlayerCtrl', ['$scope', '$rootScope', PlayerCtrl]);
function PlayerCtrl($scope, $rootScope) {
  $scope.playlist = [];
  $scope.player = {};
  $rootScope.$on("add-to-playlist", function (event, music) {
    $scope.playlist.push({src:'public/music/' + music.filename, type: 'audio/mp3'});
  });
}
