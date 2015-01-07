'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp')
  .controller('RegisterCtrl', function ($scope, $http , $location ,alert ,API_URL) {

		$scope.usuario = {
			nome:'',
			email:'',
			senha:'',
			sexo : 'm',
			estadoSelecionado:null,
			cidadeSelecionada:null,
			tipoSelecionado:null,
			usuarioAceitou:true,
			nascimento :  new Date(1987,2,27),
			twitter: '',
			instagram: '',
		};
	
		$scope.origem = angular.copy($scope.usuario);
	
		$scope.estados=[];
		$scope.tipos = [];
	
		$http({method:'GET',url:API_URL+'getestados'})
		.success(function(result){
			$scope.estados = result;
		}).error(function(err){
		});
	
		$http({method:'GET',url:API_URL+'tipos'})
		.success(function(result){
			$scope.tipos = result;
			$scope.usuario.tipoSelecionado=result[0];
		}).error(function(err){
		});	
	
		
		$scope.submit = function(){
			
			var url = API_URL+'usuarios/create/';
			var user = {
					nome: $scope.usuario.nome,
					email:$scope.usuario.email,
					senha:$scope.usuario.senha,
					sexo: $scope.usuario.sexo, 
					nascimento: $scope.usuario.nascimento,
					cidade:$scope.usuario.cidadeSelecionada.id,
					tipo: $scope.usuario.tipoSelecionado.id,
					twitter:$scope.usuario.twitter,
					instagram:$scope.usuario.instagram	
			};
			
			var separador = '?';
			var params = '';
			angular.forEach(user ,function(item,key){
				params+=separador+key+'='+item;	
				separador = '&';
			});
		
			$http.get(url+params)
			.success(function(){
				alert('success', 'Cadastro efetuado com sucesso', '');
				$scope.reset();
			})
			.error(function(err){
				alert('fail', 'Erro ao efetuar cadastro,', 'por favor tente novamente');
			});
			
		};
	
	
		$scope.reset = function(){
			$scope.usuario = angular.copy($scope.origem);
		}
	
	
	
	
 });
