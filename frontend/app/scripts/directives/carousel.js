'use strict';


angular.module( 'musicaApp')

  .directive('carousel', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $(element).flexslider(scope.$eval(attrs.carousel));
        }
    };
  
  })

  .directive('carousel-playlist', function(){
    return {
      restrict: 'A',
      link: function(element){
         $(element).flexslider({
          animation: 'slide',
          animationLoop: false,
          slideshow: false,
          controlNav: false,
          itemWidth: 203,
          itemMargin: 10
        });
      }  
    };
  
});
