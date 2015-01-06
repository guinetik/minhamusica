'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp')
  .controller('RegisterCtrl', function ($scope, $http , API_URL) {

			
	
		$scope.estadoSelecionado=null;
		$scope.cidadeSelecionada=null;
		$scope.tipoSelecionado=null;
		$scope.usuarioAceitou  = true;
			
		$scope.estados=[];
		$scope.tipos = [];
	
		$scope.sexo = 'm';
		$scope.nascimento = new Date(1987,2,27); 
			
		$http({method:'GET',url:API_URL+'getestados'})
		.success(function(result){
			$scope.estados = result;
		}).error(function(err){
			//console.log(err);
		});
	
		$http({method:'GET',url:API_URL+'tipos'})
		.success(function(result){
			$scope.tipos = result;
			$scope.tipoSelecionado=result[0];
		}).error(function(err){
			//console.log(err);
		});	
	
		
		$scope.submit = function(){
			
			var url = API_URL+'usuarios/create/';
			var user = {
					nome: $scope.nome,
					email:$scope.email,
					senha:$scope.senha,
					sexo: $scope.sexo, 
					nascimento: $scope.nascimento,
					cidade:$scope.cidadeSelecionada.id,
					tipo: $scope.tipoSelecionado.id,
					twitter:$scope.twitter,
					instagram:$scope.instagram	
			};
			
			var separador = '?';
			var params = '';
			angular.forEach(user ,function(item,key){
				params+=separador+key+'='+item;	
				separador = '&';
			});
		
			
			$http.get(url+params)
			.success(function(){
				  console.log('good');
			})
			.error(function(err){
				  console.log(err);
			});

		};
	
	
	
	
 });
