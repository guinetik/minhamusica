'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp')
  .controller('CdCtrl', function ($scope) {
    
  });


/*
$(window).load(function(){


  // store the slider in a local variable
  var $window = $(window),
      flexslider;
 
  // tiny helper function to add breakpoints
  function getGridSize() {
    return (window.innerWidth < 600) ? 2 :
           (window.innerWidth < 900) ? 3 : 4;
  }
 
  
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
  

});*/