'use strict';

/**
 * @ngdoc overview
 * @name musicaApp
 * @description
 * # musicaApp
 *
 * Main module of the application.
 */
angular.module('musicaApp').config(function ($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: '/views/main.html',
      controller: 'MainCtrl'
    })
    .state('cd', {
      url: '/cd',
      templateUrl: '/views/cd.html',
      controller: 'CdCtrl'
    })
    .state('perfil', {
      url: '/perfil',
      templateUrl: '/views/profile.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/views/signup.html',
      controller: 'SignUpCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'LoginCtrl'
    }).
    state('novocd', {
      url: '/novocd',
      templateUrl: '/views/painel/novocd.html'
    });
})
  .constant('API_URL', 'http://localhost:1337/');
