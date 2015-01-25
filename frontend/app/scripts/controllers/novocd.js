'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:NovocdCtrl
 * @description
 * # NovocdCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('NovoCDCtrl', ['$scope', 'api', 'auth', 'toastr', '$state','$timeout', NovoCDCtrl]);
function NovoCDCtrl($scope, api, auth, toastr, $state, $timeout) {
  $scope.cd = {};
  $scope.cd.musicas = [];
  $scope.generos = [];
  $scope.files = [];
  $scope.capa = [];
  $scope.generateThumb = function(file) {
    console.log("generateThumb", file);
    if (file != null) {
      if (file.type.indexOf('image') > -1) {
        $timeout(function() {
          var fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = function(e) {
            $timeout(function() {
              file.dataUrl = e.target.result;
            });
          }
        });
      }
    }
  };
  $scope.imageDropped = function ($files, $event, $rejectedFiles) {
    console.log("acceped", $files);
    console.log("rejected", $rejectedFiles);
  };
  $scope.fileDropped = function ($files, $event, $rejectedFiles) {
    for (var i = 0; i < $files.length; i++) {
      var filename = $files[i].name;
      if (filename.substr(filename.length - 3, 3) == "mp3") {
        var file = $files[i];
        var music = {};
        music.file = file;
        music.status = 0;
        music.cd = $scope.cd.id;
        music.nome = file.name;
        $scope.cd.musicas.push(music);
        api.addMusic(music, function(data, status, headers, config){
          if(status == 200) {
            toastr.success(data.message);
            config.file.message = 'Enviada';
            config.file.status = 2;
          } else {
            toastr.warning(data.message);
            config.file.message = 'Erro ao enviar';
            config.file.status = 0;
          }
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
  $scope.deleteMusic = function(musica) {
    var token = auth.getToken();
    api.deleteMusic(musica, token, function(result) {
      if(result.status == 200) {
        toastr.success("Musica deletada");
        var index = $scope.cd.musicas.indexOf(musica);
        $scope.cd.musicas.splice(index, 1);
      }
    });
  };
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
  $scope.salvarCd = function() {
    toastr.info("Cd Criado com sucesso!");
    $state.go("cd", {id:$scope.cd.id});
  }
}
