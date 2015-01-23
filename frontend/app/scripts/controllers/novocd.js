'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:NovocdCtrl
 * @description
 * # NovocdCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('NovoCDCtrl', ['$scope', 'api', 'auth', 'toastr', '$upload', 'API_URL', NovoCDCtrl]);
function NovoCDCtrl($scope, api, auth, toastr, $upload, API_URL) {
  $scope.cd = {};
  $scope.cd.musicas = [];
  $scope.generos = [];
  $scope.files = [];
  $scope.fileDropped = function ($files, $event, $rejectedFiles) {
    for(var i=0;i<$files.length;i++) {
      var filename = $files[i].name;
      if(filename.substr(filename.length-3, 3) == "mp3") {
        var file = $files[i];
        $scope.cd.musicas.push($files[i]);
        $scope.upload = $upload.upload({
          url: API_URL + 'cd/music/add',
          method: 'POST',
          data: {id_cd:$scope.cd.id},
          file: file
        }).progress(function(evt) {
          console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.config.file.name);
        }).success(function(data, status, headers, config) {
          console.log('file ' + config.file.name + 'is uploaded successfully. Response: ', data);
        });
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
        $scope.cd.id = result.cd.id;
        $scope.cd.musicas = [];
      } else {
        toastr.warning(result.message);
      }
    });
  };
}
