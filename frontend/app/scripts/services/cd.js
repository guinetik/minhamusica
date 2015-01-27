'use strict';

/**
 * @ngdoc service
 * @name musicaApp.cd
 * @description
 * # cd
 * Service in the musicaApp.
 */
angular.module('musicaApp').service('cd', ['$timeout', 'toastr', 'api', 'auth','$state', cd]);
function cd($timeout, toastr, api, auth, $state) {
  var cd = this;
  cd.getGeneros = function($scope) {
    $timeout(function(){
      api.getGeneros(function (result) {
        if (result.status == 200) {
          $scope.generos = result.generos;
        }
      });
    });
  };
  cd.getCd = function($scope) {
    $timeout(function(){
      api.getGeneros(function (result) {
        if (result.status == 200) {
          $scope.generos = result.generos;
          api.getCD($scope.cd.id, function (result) {
            if (result.status == 200) {
              $scope.cd = result;
              $scope.cd.saved = true;
              $scope.capa.dataUrl = $scope.capa.imagem = "public/img/cover/" + $scope.cd.capa;
              cd.setMusicStatus($scope);
            }
          });
        }
      });
    });
  };
  cd.setMusicStatus = function($scope) {
    var musicas = $scope.cd.musicas;
    angular.forEach(musicas, function (value, key) {
      value.status = 2;
      value.message = "Enviada";
    });
  };
  cd.salvarCd = function($scope) {
    toastr.info("Cd Criado com sucesso!");
    $state.go("cd", {id:$scope.cd.id});
  };
  cd.generateThumb = function($scope, file) {
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
  cd.updateCover = function($scope, file) {
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
  cd.fileDropped = function ($scope, $files, $event, $rejectedFiles) {
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
  cd.deleteMusic = function($scope,musica) {
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
  cd.create = function($scope) {
    var token = auth.getToken();
    api.addCd(token, $scope.cd, function (result) {
      if (result.status == 200) {
        toastr.success(result.message);
        $scope.view = "songs";
        $scope.cd.saved = true;
        $scope.cd.id = result.cd.id;
        $scope.cd.musicas = [];
      } else {
        console.log("error", result);
        if(result.message != null) {
          toastr.warning(result.message);
        } else {
          toastr.warning("Ocorreu um erro ao salvar o cd:" + result.status);
        }
      }
    });
  };
  cd.update = function($scope) {
    var token = auth.getToken();
    api.updateCD($scope.cd, token, function(result) {
      if(result.status == 200) {
        $scope.view = "songs";
        toastr.info("CD atualizado");
      } else {
        toastr.error("Houve um erro ao atualizar o CD");
      }
    });
  };
  cd.updateMusic = function($scope,music) {
    var token = auth.getToken();
    api.updateMusic(music, token, function(result){
      console.log("updateMusic", result);
      if(result.status == 200) {
        toastr.info("Música renomeada");
      } else {
        toastr.error("Houve um erro ao renomear a música");
      }
    });
  };
}
