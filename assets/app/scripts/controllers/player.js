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
  $scope.hasBeenAddedToPlaylist = function(id) {
    var r = false;
    angular.forEach($scope.playlist, function (song, key) {
      if(song.id == id) {
        console.log("if");
        r = true;
      }
    });
    return r;
  };
  $scope.getSongById = function(id) {
    var k = -1;
    for(var i = 0;i<$scope.playlist.length;i++) {
      var song = $scope.playlist[i];
      if(song.id == id) {
        k = i;
      }
    }
    return k;
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
          id:song.id,
          cd: cd,
          src: '/public/music/' + song.filename,
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
    var k = $scope.hasBeenAddedToPlaylist(music.id);
    if(!k) {
      $scope.playlist.unshift(
        {
          id:music.id,
          title: music.nome,
          cd: music.cd,
          src: '/public/music/' + music.filename,
          type: 'audio/mp3'
        }
      );
      functions.playlist.show();
      $timeout(function(){
        $scope.player.play(0, false);
      });
    } else {
      k = $scope.getSongById(music.id);
      $scope.player.play(k);
    }
  });
  $scope.next = function(id) {
    $scope.player.play(id, false);
  }
}
