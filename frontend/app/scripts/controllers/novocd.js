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
  $scope.cd = {
    musicas:[]
  };
  $scope.generos = [];
  $scope.files = [];
  $scope.capas = [];
  $scope.capa = {};
  $scope.generateThumb = function(file) {
    if (file != null) {
      if (file.type.indexOf('image') > -1) {
        $scope.updateCover(file);
        $timeout(function() {
          var fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = function(e) {
            $timeout(function() {
              $scope.capa.dataUrl = e.target.result;
            });
          }
        });
      }
    }
  };
  $scope.updateCover = function(file) {
    if($scope.cd.id != null) $scope.capa.cd = $scope.cd.id;
    var token = auth.getToken();
    api.updateCover(file, $scope.capa, token, function(data, status, headers, config){
      if(status == 200) {
        toastr.info(data.message);
        $scope.cd.capa = data.imagem;
      } else {
        toastr.warning(data.message);
      }
    });
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
            toastr.info(data.message);
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
        toastr.info("Música deletada");
        var index = $scope.cd.musicas.indexOf(musica);
        $scope.cd.musicas.splice(index, 1);
      } else {
        toastr.error("Houve um erro ao apagar a música");
      }
    });
  };
  $scope.submit = function () {
    console.log("cd", $scope.cd);
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
  };
  $scope.updateMusic = function(music) {
    var token = auth.getToken();
    api.updateMusic(music, token, function(result){
      console.log("updateMusic", result);
      if(result.status == 200) {
        toastr.info("Música renomeada");
      } else {
        toastr.error("Houve um erro ao renomear a música");
      }
    });
  }
}
