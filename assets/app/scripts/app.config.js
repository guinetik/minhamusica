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
        .state('home', {
            url: '/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .state('main', {
            url: '',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .state('cd', {
            url: '/cd/:id',
            templateUrl: 'views/cd.html',
            controller: 'CdCtrl'
        })
        .state('perfil', {
            url: '/perfil/:id',
            controller: 'PerfilCtrl',
            templateUrl: 'views/profile.html'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signup.html',
            controller: 'SignUpCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        }).
        state('painel', {
            url: '/painel',
            abstract: true,
            templateUrl: 'views/painel/painel.html'
        }).
        state('novo_cd', {
            parent: "painel",
            url: '/cd/novo',
            controller: 'NovoCDCtrl',
            templateUrl: 'views/painel/cd_form.html'
        }).
        state('editar_cd', {
            parent: "painel",
            url: '/cd/edit/:id',
            controller: 'EditCDCtrl',
            templateUrl: 'views/painel/cd_form.html'
        }).
        state('meus_cds', {
            parent: "painel",
            url: '/cds',
            controller: 'MeusCDsCtrl',
            templateUrl: 'views/painel/cds.html'
        }).
        state('novo_evento', {
            parent: "painel",
            url: '/eventos/novo',
            controller: 'NovoEventoCtrl',
            templateUrl: 'views/painel/novo_evento.html'
        }).
        state('meus_eventos', {
            parent: "painel",
            url: '/eventos',
            controller: 'MeusEventosCtrl',
            templateUrl: 'views/painel/meus_eventos.html'
        }).
        state('config', {
            parent: "painel",
            url: '/config',
            controller: 'ConfigsCtrl',
            templateUrl: 'views/painel/config.html'
        }).
        state('config_password', {
            parent: "painel",
            url: '/config/password',
            controller: 'ConfigPasswordCtrl',
            templateUrl: 'views/painel/config_password.html'
        })
        .state('genero', {
            url: '/genero/:id',
            controller: 'GeneroCtrl',
            templateUrl: 'views/genero.html'
        }).state('busca', {
            url: '/busca/:q',
            controller: 'BuscaCtrl',
            templateUrl: 'views/busca.html'
        });
})
    .constant('API_URL', '/')
    //.constant('API_URL', 'http://musicatop.jelastic.websolute.net.br/')
    //.constant('API_URL', 'http://localhost:1337/')
    .config(function (toastrConfig) {
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
    })
    .config(function (blockUIConfig) {
        blockUIConfig.message = 'Carregando';
        blockUIConfig.delay = 10;
    })
    .config(function (ezfbProvider) {
        ezfbProvider.setLocale('pt_br');
        ezfbProvider.setInitParams({
            // This is my FB app id for plunker demo app
            appId: '425861320888040',

            // Module default is `v1.0`.
            // If you want to use Facebook platform `v2.0`, you'll have to add the following parameter.
            // https://developers.facebook.com/docs/javascript/reference/FB.init/v2.0
            version: 'v2.0'
        });
    });
