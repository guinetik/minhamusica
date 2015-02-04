'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('MainCtrl', ['$scope', '$rootScope', 'api', '$timeout', MainCtrl]);
function MainCtrl($scope, $rootScope, api, $timeout) {
    $scope.home = {};
    $scope.bannersLoaded = false;
    $scope.$on('$viewContentLoaded', function (event) {
        $timeout($scope.updateHome);
    });
    $scope.updateHome = function () {
        api.getHome(function (result) {
            if (result.status == 200) {
                $scope.home = result.home;
                angular.forEach($scope.home.banners, function (banner, key) {
                    banner.mimeType = 'image/png';
                    banner.src = '/public/img/' + banner.src;
                });
                $timeout(function () {
                    $scope.bannersLoaded = true;
                    $scope.slickHandle.slickGoTo(0);
                }, 500);
            } else {
                window.location.reload();
            }
        });
    };
    $scope.slickHandle = {
        currentSlide: 0
    };
    $scope.slickConfig = {
        dots: false,
        autoplay: true,
        slidesToShow: 1,
        centerMode: true,
        arrows:true,
        variableWidth: true,
        adaptiveHeight: false,
        autoplaySpeed: 3000,
        lazyLoad: 'progressive',
        onAfterChange: function (slide, index) {
            console.log("index", index);
            $scope.slickHandle.currentSlide = index;
            $scope.$apply();
        }
    };
}
