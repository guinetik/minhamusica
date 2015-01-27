'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:ConfigsCtrl
 * @description
 * # ConfigsCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('ConfigsCtrl', ['$scope', 'api', 'auth', '$timeout', '$state', 'toastr', ConfigsCtrl]);
function ConfigsCtrl($scope, api, auth, $timeout, $state, toastr) {
  $scope.usuario = {};
  $scope.capa = {};
  $scope.foto = {};
  $scope.estados = [];
  $scope.$on('$viewContentLoaded', function (event) {
    $timeout(function(){
      api.getEstados(function(result){
        $scope.estados = result;
        var token = auth.getToken();
        api.lookup(token, function(result){
          if(result.status == 200) {
            $scope.usuario = result.data;
            $scope.capa.dataUrl = $scope.capa.imagem = $scope.usuario.capa;
            $scope.foto.dataUrl = $scope.foto.imagem = $scope.usuario.foto;
            $scope.selectEstado($scope.usuario.cidade.estado);
            $scope.usuario.nascimento = new Date($scope.usuario.nascimento);
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
      console.log("updateProfile", result);
      if(result.status == 200) {
        toastr.success("Perfil atualizado");
      } else {
        toastr.error("Houve um erro ao atualizar o perfil.");
      }
    });
  };
}
