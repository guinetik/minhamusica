'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:PerfilCtrl
 * @description
 * # PerfilCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('PerfilCtrl', ['$scope', 'api', '$stateParams', '$timeout', 'toastr', '$dialogs', PerfilCtrl]);
function PerfilCtrl($scope, api, $stateParams, $timeout, toastr, $dialogs) {
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
    $scope.processVote = function() {
        var dlg = $dialogs.create('views/sms_dialog.html','SMSController',{},{key: false,back: 'static'});
        dlg.result.then(function(cell_number){
            console.log("cell_number", cell_number);
            api.voteSMS($scope.perfil, cell_number, function(result){
                console.log("voteForArtist", result);
                if(result.error) {
                    toastr.warning(result.msg);
                } else {
                    toastr.success(result.msg);
                    var confirm_code_dialog = $dialogs.create('views/code_dialog.html','ConfirmController',{},{key: false,back: 'static'});
                    confirm_code_dialog.result.then(function(confirmation){
                        console.log("confirmation", confirmation);
                        api.confirmVote($scope.perfil, confirmation, function(result){
                            console.log("confirmVote", result);
                            if(result.error) {
                                toastr.warning(result.msg);
                            } else {
                                toastr.success(result.msg);
                            }
                        })
                    },function(){

                    });
                }
            })
        },function(){

        });
        /*console.log("profile.processVote");
        api.voteForArtist($scope.perfil, function(result){
           console.log("voteForArtist", result);
            if(result.error) {
                toastr.warning(result.msg);
            } else {
                toastr.success(result.msg);
            }
        });*/
    };
}
angular.module("musicaApp").controller('SMSController',function($scope,$modalInstance,data) {
    $scope.user = {cell:""};
    $scope.cancel = function () {
        $modalInstance.dismiss('canceled');
    }; // end cancel

    $scope.save = function () {
        console.log("save", $scope.user.cell);
        $modalInstance.close($scope.user.cell);
    }; // end sa
});
angular.module("musicaApp").controller('ConfirmController',function($scope,$modalInstance,data) {
    $scope.user = {code:""};
    $scope.cancel = function () {
        $modalInstance.dismiss('canceled');
    }; // end cancel

    $scope.save = function () {
        console.log("save", $scope.user.code);
        $modalInstance.close($scope.user.code);
    }; // end sa
});