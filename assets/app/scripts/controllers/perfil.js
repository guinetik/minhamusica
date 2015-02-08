'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:PerfilCtrl
 * @description
 * # PerfilCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('PerfilCtrl', ['$scope', 'api', '$stateParams', '$timeout', PerfilCtrl]);
function PerfilCtrl($scope, api, $stateParams, $timeout) {
    $scope.perfil = {};
    $scope.id = $stateParams.id;
    $scope.$on('$viewContentLoaded', function (event) {
        $timeout($scope.updateProfile);
    });
    $scope.updateProfile = function () {
        console.log("updateProfile", $scope.id);
        api.getProfile($scope.id, function (result) {
            console.log("updateProfile", result);
            if (result.status == 200) {
                $scope.perfil = result.perfil;
            }
        })
    };
}
