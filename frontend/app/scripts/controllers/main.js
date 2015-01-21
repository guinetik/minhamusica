'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('MainCtrl', ['$scope', '$rootScope', 'auth', MainCtrl]);
function MainCtrl($scope, $rootScope, auth) {
  $scope.$on('$viewContentLoaded', function(event){
    console.log("viewContentLoaded");
    $scope.windowWidth = $(window).width();
    $scope.windowHeight = $(window).height();
    $scope.htmlHeight = $(document).height();
    $scope.maskBanner();
  });
  $scope.maskBanner = function(){
    var widthBanner = $('#banners-carousel .flex-viewport').width();
    var widthOuter = $scope.windowWidth;
    var widthMask = (parseInt(widthOuter) - parseInt(widthBanner))/2;
    $('#banners .banners-mask .left, #banners .banners-mask .right').css('width', widthMask + 'px');
  }
}
