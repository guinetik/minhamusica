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




$(window).load(function(){



  $('#banners-thumbs').flexslider({
    animation: 'slide',
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 140,
    itemMargin: 5,
    asNavFor: '#banners-carousel'
  });
  
  $('#banners-carousel').flexslider({
    animation: 'slide',
    controlNav: false,
    animationLoop: true,
    slideshow: true,
    slideshowSpeed: 7000,
    pauseOnHover: true,
    itemWidth: 1000,
    sync: '#banners-thumbs'
  });
  
  
  $('#lastest-uploads-list').flexslider({
    animation: 'slide',
    animationLoop: false,
    slideshow: false,
    controlNav: false,
    direction: 'vertical'
  });
  
  
  // store the slider in a local variable
  var $window = $(window),
      flexslider;
 
  // tiny helper function to add breakpoints
  function getGridSize() {
    return (window.innerWidth < 600) ? 2 :
           (window.innerWidth < 900) ? 3 : 4;
  }
 
  $(function() {
    SyntaxHighlighter.all();
  });
  
  
   $('#playlist-musics-list').flexslider({
    animation: 'slide',
    animationLoop: false,
    slideshow: false,
    controlNav: false,
    itemWidth: 203,
    itemMargin: 10,
    minItems: getGridSize(), // use function to pull in initial value
    maxItems: getGridSize() // use function to pull in initial value
  });
  
  
  // check grid size on resize event
  $window.resize(function() {
    var gridSize = getGridSize();
 
    flexslider.vars.minItems = gridSize;
    flexslider.vars.maxItems = gridSize;
  });

  
  // Plug Playlist
  $(document).on('click', '#playlist .playlist-plug', function(e){
    
    e.preventDefault();
    
    $(this).toggleClass('closed');
    if( $('#playlist').hasClass('visible')){
      $('#playlist').animate({'height' : '5px', 
                              'border-top': '1px solid #3a3a3a'});
      $('#playlist .playlist-plug').attr('title', 'Abrir Playlist');
      $('#playlist').removeClass('visible');
    }else{
      $('#playlist').animate({'height' : '172px', 
                              'border-top' : 0});
      $('#playlist .playlist-plug').attr('title', 'Esconder Playlist');
      $('#playlist').addClass('visible');
    }
    
  });
  
  
});