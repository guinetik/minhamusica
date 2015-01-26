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
      url: '/cd/:id',
      templateUrl: '/views/cd.html',
      controller: 'CdCtrl'
    })
    .state('perfil', {
      url: '/perfil/:id',
      controller:'PerfilCtrl',
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
    state('painel', {
      url: '/painel',
      templateUrl: '/views/painel/painel.html'
    }).
    state('novo_cd', {
      parent: "painel",
      url: '/painel/cds/novo',
      controller: 'NovoCDCtrl',
      templateUrl: '/views/painel/novocd.html'
    }).
    state('meus_cds', {
      parent: "painel",
      url: '/painel/cds',
      controller: 'MeusCDsCtrl',
      templateUrl: '/views/painel/cds.html'
    }).
    state('novo_evento', {
      parent: "painel",
      url: '/painel/eventos/novo',
      controller: 'NovoEventoCtrl',
      templateUrl: '/views/painel/novo_evento.html'
    }).
    state('meus_eventos', {
      parent: "painel",
      url: '/painel/eventos',
      controller: 'MeusEventosCtrl',
      templateUrl: '/views/painel/meus_eventos.html'
    }).
    state('config', {
      parent: "painel",
      url: '/painel/config',
      controller: 'ConfigsCtrl',
      templateUrl: '/views/painel/config.html'
    }).
    state('config_password', {
      parent: "painel",
      url: '/painel/config/password',
      controller: 'ConfigPasswordCtrl',
      templateUrl: '/views/painel/config_password.html'
    });
}).constant('API_URL', 'http://localhost:1337/').config(function (toastrConfig) {
  angular.extend(toastrConfig, {
    allowHtml: false,
    closeButton: true,
    closeHtml: '<button>&times;</button>',
    containerId: 'toast-container',
    extendedTimeOut: 500,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },
    tapToDismiss: true,
    timeOut: 1000
  });
}).config(function (blockUIConfig) {
  blockUIConfig.message = 'Carregando';
  blockUIConfig.delay = 10;
});
