'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('PlayerCtrl', ['$scope', '$rootScope', '$timeout', PlayerCtrl]);
function PlayerCtrl($scope, $rootScope, $timeout) {
  $scope.playload = false;
  var slickOptions = {
    lazyLoad:       'ondemand',
    arrows:         true,
    dots:           true,
    infinite:       false,
    autoplay:       false,
    slidesToShow:   4,
    slidesToScroll: 4,
    cssEase:        'linear'
  };
  $rootScope.$on("add-cd-to-playlist", function (event, _cd) {
    var cd = angular.copy(_cd);
    var songs = angular.copy(cd.musicas).reverse();
    delete cd.musicas;
    functions.playlist.show();
    angular.forEach(songs, function (song, key) {
      $scope.playlist.unshift(
        {
          title: song.nome,
          cd: cd,
          src: 'public/music/' + song.filename,
          type: 'audio/mp3'
        }
      );
      $(".progress").width(0);
      $timeout(function(){
        $scope.player.play(0, false);
      });
    });
  });
  $rootScope.$on("add-to-playlist", function (event, music) {
    $scope.playload = true;
    $scope.playlist.push(
      {
        title: music.nome,
        cd: music.cd,
        src: 'public/music/' + music.filename,
        type: 'audio/mp3'
      }
    );
    functions.playlist.show();
    $timeout(function(){
      $scope.player.play($scope.playlist.length-1, false);
    });
  });
  $scope.next = function(id) {
    $scope.player.play(id, false);
  }
}
