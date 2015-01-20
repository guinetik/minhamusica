'use strict';

/**
 * @ngdoc overview
 * @name musicaApp
 * @description
 * # musicaApp
 *
 * Main module of the application.
 */
angular
  .module('musicaApp', ['ui.router']);


var helpers = helpers || {};

helpers = {
  genreDropdown : {
    show: function(event){
      event.stopPropagation();
    },
    hide: function(){
    
    }
  },
  playlist: {
    init: function(element){
      var _this = $(element);
      _this.toggleClass('closed');
      if( $('#playlist').hasClass('visible')){
        helpers.playlist.hide();
      }else{
        helpers.playlist.show();
      }
    },
    show: function(event){
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
  }
};


$(document).on('click', function(){
  $('#box-type-login').stop().fadeOut(300);
  $('#open-type-login').removeClass('open');
});


$(window).load(function(){

  
  
  // Plug Playlist
  $(document).on('click', '#playlist .playlist-plug', function(e){
    e.preventDefault();
    helpers.playlist.init(this);
  });
  
  
  
  // Genre dropdown
  $(document).on('click', '#genre .genre-trigger', function(e){
    
    e.preventDefault();
    helpers.genreDropdown.init();
    
  });
  

});