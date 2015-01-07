'use strict';

/**
 * @ngdoc overview
 * @name musicaApp
 * @description
 * # musicaApp
 *
 * Main module of the application.
 */
angular
  .module('musicaApp').config(function( $urlRouterProvider , $stateProvider){
    
    $urlRouterProvider.otherwise('/');
    
    
    $stateProvider
    .state('main' , { 
        url:'/',
        templateUrl: '/views/main.html'
    })
    .state('cd' , { 
        url:'/cd',
        templateUrl: '/views/cd.html'
    })
    .state('register' , { 
        url:'/register',
        templateUrl: '/views/register.html',
        controller: 'RegisterCtrl'
    })
	.state('login' , { 
        url:'/login',
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
    });
	


})
.constant('API_URL' , 'http://localhost:1337/')
