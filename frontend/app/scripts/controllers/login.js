'use strict';

/**
 * @ngdoc function
 * @name musicaApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the musicaApp
 */
angular.module('musicaApp')
  .controller('LoginCtrl', function ($scope, $http , alert, auth,API_URL) {
  
		$scope.usuario = {
			email: '',
			senha: '' 
		};
		
		
		$scope.origem = angular.copy($scope.usuario);
		
		$scope.submit = function(){
			$http.post(API_URL+'login', $scope.usuario)
			.success(function(result){
				alert('sucess', 'Sucesso ao efetuar login,', '');
				auth.setToken(result.token);
			})
			.error(function(error){
				console.log(error);
				alert('fail', 'Erro ao efetuar login,', 'por favor tente novamente');
			});
		}
		
		$scope.reset = function(){
			$scope.usuario = angular.copy($scope.origem);
		}
	
	
  });
