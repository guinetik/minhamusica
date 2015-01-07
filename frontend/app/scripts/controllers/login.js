'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp')
  .controller('LoginCtrl', function ($scope, $http, alert, API_URL) {
  
		$scope.usuario = [{login : "",
						   senha: "" }];
		
		
		$scope.origem = angular.copy($scope.usuario);
	
	
		$scope.login = function(){
			$http.post(API_URL+'login', $scope.usuario).
			success(function(){
				//alert();
				alert('success', 'Sucesso ao efetuar login,', '');
			}).fail(function(error){
				alert('fail', 'Erro ao efetuar login,', 'por favor tente novamente');
			});
		}
		
		$scope.reset = function(){
			$scope.usuario = angular.copy($scope.origem);
		}
	
	
  });
