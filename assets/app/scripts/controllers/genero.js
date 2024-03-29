/**
 * Created by guinetik on 2/1/15.
 */
'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:GeneroCtrl
 * @description
 * # MeuscdsCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('GeneroCtrl', ['$scope', 'api', 'toastr', '$timeout', '$stateParams', GeneroCtrl]);
function GeneroCtrl($scope, api, toastr, $timeout, $stateParams) {
    $scope.cds = [];
    $scope.genero = "";
    $scope.$on('$viewContentLoaded', function (event) {
        $timeout($scope.updateGeneros);
    });
    $scope.updateGeneros = function () {
        var id = $stateParams.id;
        api.getCdsByGenero(id, function (result) {
            if (result.status == 200) {
                $scope.genero = result.genero;
                $scope.cds = result.cds;
            }
        });
    };
}
