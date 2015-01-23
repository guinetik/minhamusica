'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:NovocdCtrl
 * @description
 * # NovocdCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('NovoCDCtrl', ['$scope', 'api', 'auth', 'toastr', '$upload', NovoCDCtrl]);
function NovoCDCtrl($scope, api, auth, toastr, $upload) {
  $scope.cd = {saved: true};
  $scope.cd.musicas = [];
  $scope.generos = [];
  $scope.files = [];
  $scope.fileDropped = function ($files, $event, $rejectedFiles) {
    console.log("files", $files);
    console.log("rfiles", $rejectedFiles);
    for(var i=0;i<$files.length;i++) {
      var filename = $files[i].name;
      if(filename.substr(filename.length-3, 3) == "mp3") {
        $scope.cd.musicas.push($files[i]);
      }
    }
  };
  api.getGeneros(function (result) {
    if (result.status == 200) {
      $scope.generos = result.generos;
    }
  });
  $scope.$on('$viewContentLoaded', function (event) {

  });
  $scope.submit = function () {
    var token = auth.getToken();
    api.addCd(token, $scope.cd, function (result) {
      if (result.status == 200) {
        toastr.success(result.message);
        $scope.cd.saved = true;
        $scope.cd.musicas = [];
      } else {
        toastr.warning(result.message);
      }
    });
  };
}
