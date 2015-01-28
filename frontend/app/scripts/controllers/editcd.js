'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:EditcdCtrl
 * @description
 * # EditcdCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('EditCDCtrl', ['$scope', 'cd', '$stateParams', EditCDCtrl]);
function EditCDCtrl($scope, cd, $stateParams) {
  $scope.cd = {};
  $scope.generos = [];
  $scope.capas = [];
  $scope.capa = {};
  $scope.view = "basic";
  $scope.cd.id = $stateParams.id;
  $scope.title = "EDITAR CD";
  $scope.toggleState = function(view) {
    if($scope.cd.saved) {
      $scope.view = view;
    }
  };
  $scope.generateThumb = function(file) {
    cd.generateThumb($scope, file);
  };
  $scope.updateCover = function(file) {
    cd.updateCover($scope, file);
  };
  $scope.fileDropped = function ($files, $event, $rejectedFiles) {
    cd.fileDropped($scope, $files, $event, $rejectedFiles);
  };
  $scope.deleteMusic = function(musica) {
    cd.deleteMusic($scope, musica)
  };
  $scope.submit = function () {
    console.log("cd", $scope.cd);
    cd.update($scope);
  };
  $scope.salvarCd = function() {
    cd.salvarCd($scope);
  };
  $scope.updateMusic = function(music) {
    cd.updateMusic($scope, music);
  };
  $scope.$on('$viewContentLoaded', function (event) {
    cd.getCd($scope);
  });
}
