'use strict';

/**
 * @ngdoc overview
 * @name musicaApp
 * @description
 * # musicaApp
 *
 * Main module of the application.
 */
var mm = angular.module('musicaApp', ['ui.router', 'toastr']);
var playlist = playlist || {}
playlist = {
  show: function(){
    $('#playlist').animate({'height' : '172px',
                              'border-top' : 0});
    $('#playlist .playlist-plug').attr('title', 'Esconder Playlist');
    $('#playlist').addClass('visible');
  },
  hide: function(){

    $('#playlist').animate({'height' : '5px',
                              'border-top': '1px solid #3a3a3a'});
    $('#playlist .playlist-plug').attr('title', 'Abrir Playlist');
    $('#playlist').removeClass('visible');

  }
};
$(window).load(function(){
  // Plug Playlist
  $(document).on('click', '#playlist .playlist-plug', function(e){
    e.preventDefault();
    $(this).toggleClass('closed');
    if( $('#playlist').hasClass('visible')){
      playlist.hide();
    }else{
      playlist.show();
    }
  });
  // Genre dropdown
  $(document).on('click', '#genre .genre-trigger', function(e){
    e.preventDefault();
  });
});
