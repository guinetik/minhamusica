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
  $scope.banners = [
    {link: "#", image: "images/banners/banner-1.jpg"},
    {link: "#", image: "images/banners/banner-1.jpg"},
    {link: "#", image: "images/banners/banner-1.jpg"},
    {link: "#", image: "images/banners/banner-1.jpg"}
  ];
  $scope.$on('$viewContentLoaded', function (event) {
    console.log("viewContentLoaded");
  });
}
