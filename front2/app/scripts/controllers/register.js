'use strict';
/**
 * @ngdoc function
 * @name front2App.controller:RegistercrlCtrl
 * @description
 * # RegistercrlCtrl
 * Controller of the front2App
 */
angular.module('front2App')
  .controller('RegisterCtrl', function ($scope ,$http ,alert) {
	
	$scope.submit = function(){
		console.log('submit');
		
		var url = 'http://localhost:1337/registrar';
		
		var user = {nome:$scope.nome , 
				   	email:$scope.email ,
				   	senha:$scope.senha ,
				   	sexo :"m"};
		
		$http.post(url ,user)
			.success(function(){
				alert('success', 'OK!', 'You are now registered');
			})
			.error(function(err){
				alert('warning', 'Opps!', 'Could not register');
				//console.log('bad');
			});	
		
	}
	
    
  });
