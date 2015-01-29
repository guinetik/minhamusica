'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('MainCtrl', ['$scope', '$rootScope', 'api','$timeout', MainCtrl]);
function MainCtrl($scope, $rootScope, api, $timeout) {
  $scope.home = {};
  $scope.$on('$viewContentLoaded', function (event) {
    $timeout($scope.updateHome);
  });
  $scope.updateHome = function() {
    api.getHome(function(result) {
      if(result.status == 200) {
        $scope.home = result.home;
        angular.forEach($scope.home.banners, function (banner, key) {
          banner.mimeType = 'image/png';
          banner.src = 'public/img/banner/' + banner.src;
        });
        console.log("home", $scope.home);
      } else {
        window.location.reload();
      }
    });
  };
  $scope.slickConfig = {
    dots: true,
    autoplay: true,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    adaptiveHeight: false,
    autoplaySpeed: 3000
  };

}
