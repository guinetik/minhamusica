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
    $scope.submit = function(){
     
        var url = 'http://localhost:3000/register';
        var user = {
                email:$scope.email,
                senha:$scope.senha
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
