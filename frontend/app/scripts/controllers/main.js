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



var main = {
  windowWidth : $(window).width(),
  windowHeight : $(window).height(),
  htmlHeight : $(document).height(),
  init : function(e){
    main.windowWidth = $(window).width();
    main.windowHeight = $(window).height();
    main.htmlHeight = $(document).height();
    main.maskBanner();  
  },
  maskBanner: function(){
  
    var widthBanner = $('#banners-carousel .flex-viewport').width();
    var widthOuter = main.windowWidth;
    var widthMask = (parseInt(widthOuter) - parseInt(widthBanner))/2;
    
    $('#banners .banners-mask .left, #banners .banners-mask .right').css('width', widthMask + 'px');
    
  }
}


$(window).on('load', function(){

  main.init();
  
});


$(window).on('resize', function(){

  main.init();

});
