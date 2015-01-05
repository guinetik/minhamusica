'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp')
  .controller('RegisterCtrl', function ($scope, $http) {

		$scope.estadoSelecionado=null;
		$scope.cidadeSelecionada=null;
		$scope.tipoSelecionado=null;
			
		$scope.estados=[];
		$scope.tipos = [];
	
		$scope.sexo = 'm';
		$scope.nascimento = new Date(1987,2,27); 
			
			
		
		$http({method:'GET',url:'http://localhost:1337/getestados'})
		.success(function(result){
			$scope.estados = result;
		}).error(function(err){
			//console.log(err);
		});
	
		$http({method:'GET',url:'http://localhost:1337/tipos'})
		.success(function(result){
			$scope.tipos = result;
			$scope.tipoSelecionado=result[0];
		}).error(function(err){
		});	
	
		
	
		$scope.submit = function(){

			var url = 'http://localhost:3000/register';
			var user = {
					nome: $scope.nome,
					email:$scope.email,
					senha:$scope.senha,
					cidade:$scope.cidade,
					estado:$scope.estado,
					nascimento:$scope.nascimento ,
					twitter:$scope.twitter,
					instagram:$scope.instagram
			};

			$http.post(url , user )
			.success(function(){
				  console.log('good');
			})
			.error(function(){
				  console.log('fail');
			});

		};
	
	
	
	
 });
