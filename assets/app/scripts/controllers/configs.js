'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:ConfigsCtrl
 * @description
 * # ConfigsCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('ConfigsCtrl', ['$rootScope', '$scope', 'api', 'auth', '$timeout', '$state', 'toastr','$upload', ConfigsCtrl]);
function ConfigsCtrl($rootScope, $scope, api, auth, $timeout, $state, toastr, $upload) {
  $scope.usuario = {};
  $scope.capa = {};
  $scope.foto = {};
  $scope.estados = [];
  console.log($upload);
  $scope.$on('$viewContentLoaded', function (event) {
    $timeout(function(){
      api.getEstados(function(result){
        $scope.estados = result;
        var token = auth.getToken();
        api.lookup(token, function(result){
          if(result.status == 200) {
            $scope.usuario = result.data;
            $scope.capa.dataUrl =  $scope.capa.imagem = "/public/img/" + $scope.usuario.capa;
            $scope.foto.dataUrl = $scope.foto.imagem = "/public/img/" + $scope.usuario.foto;
            $scope.selectEstado($scope.usuario.cidade.estado);
            $scope.usuario.nascimento = new Date($scope.usuario.nascimento);
            $rootScope.$emit("user-lookup", $scope.usuario);
          } else {
            $state.go("main");
          }
        });
      });
    });
  });
  $scope.selectEstado = function(id) {
    angular.forEach($scope.estados, function (value, key) {
      if(value.id == id) {
        $scope.estado = value;
      }
    });
  };
  $scope.submit = function() {
    var token = auth.getToken();
    api.updateProfile($scope.usuario,token, function(result){
      if(result.status == 200) {
        $rootScope.$emit("user-lookup", result);
        toastr.success("Perfil atualizado");
      } else {
        toastr.error("Houve um erro ao atualizar o perfil.");
      }
    });
  };
  $scope.generateCoverThumb = function(file) {
    if (file != null) {
      console.log("capa nova", file);
      if (file.type.indexOf('image') > -1) {
        $scope.updateUserCover(file);
        $timeout(function() {
          var fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = function(e) {
            $timeout(function() {
              console.log("capa nova", e.target.result);
              $scope.capa.dataUrl = e.target.result;
            });
          }
        });
      }
    }
  };
  $scope.updateUserCover = function(file) {
    if($scope.usuario.id != null) $scope.capa.user = $scope.usuario.id;
    var token = auth.getToken();
    api.updateUserCover(file, $scope.capa, token, function(data, status, headers, config){
      if(status == 200) {
        toastr.info(data.message);
        $scope.usuario.capa = data.imagem;
        $rootScope.$emit("user-lookup", $scope.usuario);
      } else {
        toastr.warning(data.message);
      }
    });
  };
  $scope.updateUserFoto = function(file) {
    console.log("updateFoto");
    if($scope.usuario.id != null) $scope.foto.user = $scope.usuario.id;
    var token = auth.getToken();
    api.updateUserFoto(file, $scope.foto, token, function(data, status, headers, config){
      if(status == 200) {
        toastr.info(data.message);
        $scope.usuario.foto = data.imagem;
        $rootScope.$emit("user-lookup", $scope.usuario);
      } else {
        toastr.warning(data.message);
      }
    });
  };
  $scope.generateThumb = function(file) {
    console.log("foto nova", file);
    if (file != null) {
      if (file.type.indexOf('image') > -1) {
        $scope.updateUserFoto(file);
        $timeout(function() {
          var fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = function(e) {
            $timeout(function() {
              $scope.foto.dataUrl = e.target.result;
              console.log("foto nova", e.target.result);
            });
          }
        });
      }
    }
  };
}
