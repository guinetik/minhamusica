'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp').controller('SignUpCtrl', ['$scope', 'api', 'toastr', '$timeout', SignUpCtrl]);
function SignUpCtrl($scope, api, toastr, $timeout) {
  $scope.usuario = {
    nome: '',
    email: '',
    senha: '',
    sexo: 'm',
    estadoSelecionado: null,
    cidadeSelecionada: null,
    usuarioAceitou: true,
    nascimento: new Date(),
    twitter: '',
    instagram: ''
  };
  $scope.origem = angular.copy($scope.usuario);
  $scope.estados = [];
  $scope.tipos = [];
  $scope.$on('$viewContentLoaded', function (event) {
    $timeout(function(){
      api.getEstados(function(result){
        console.log("result", result);
        $scope.estados = result;
      });
    });
  });
  $scope.submit = function () {
    var user = {
      nome: $scope.usuario.nome,
      email: $scope.usuario.email,
      senha: $scope.usuario.senha,
      sexo: $scope.usuario.sexo,
      nascimento: $scope.usuario.nascimento,
      cidade: $scope.usuario.cidadeSelecionada.id,
      twitter: $scope.usuario.twitter,
      instagram: $scope.usuario.instagram
    };
    api.signup(user, function(result){
      if(result.status == 200) {
        toastr.success(result.message);
      } else {
        toastr.warning(result.message);
      }
    })
  };
  $scope.reset = function () {
    $scope.usuario = angular.copy($scope.origem);
  }
}
