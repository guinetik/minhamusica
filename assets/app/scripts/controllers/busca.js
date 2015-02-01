/**
 * Created by guinetik on 2/1/15.
 */
'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:BuscaCtrl
 * @description
 * # MeuscdsCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('BuscaCtrl', ['$scope', 'api', 'toastr', '$timeout', '$stateParams', BuscaCtrl]);
function BuscaCtrl($scope, api, toastr, $timeout, $stateParams) {
    $scope.cds = [];
    $scope.$on('$viewContentLoaded', function (event) {
        $timeout($scope.searchCD);
    });
    $scope.searchCD = function () {
        var q = $stateParams.q;
        api.searchCD(q, function (result) {
            if (result.status == 200) {
                $scope.cds = result.cds;
            }
        });
    };
}
