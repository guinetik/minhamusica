'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:NovocdCtrl
 * @description
 * # NovocdCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('NovoCDCtrl', ['$scope', 'api', 'auth','toastr', NovoCDCtrl]);
function NovoCDCtrl($scope, api, auth, toastr) {
    $scope.cd = {};
    $scope.generos = [];
    api.getGeneros(function (result) {
        if (result.status == 200) {
            $scope.generos = result.generos;
        }
    });
    $scope.$on('$viewContentLoaded', function (event) {

    });
    $scope.submit = function () {
        var token = auth.getToken();
        api.addCd(token, $scope.cd, function(result){
            if(result.status == 200) {
                toastr.success(result.message);
                $scope.cd.saved = true;
            } else {
                toastr.warning(result.message);
            }
        });
    };
}
