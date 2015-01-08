'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'AngularJS',
      'Karma'
    ];
  });



$(window).load(function(){

  $('#banners-thumbs').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 140,
    itemMargin: 5,
    asNavFor: '#banners-carousel'
  });
  $('#banners-carousel').flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 1000,
    sync: "#banners-thumbs",
    start: function(slider){
      $('body').removeClass('loading');
    }
  });

});