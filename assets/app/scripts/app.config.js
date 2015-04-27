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
            controller: 'MainCtrl',
            ncyBreadcrumb: {
                label: 'Home',
                skip:true
            }
        })
        .state('main', {
            url: '',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            ncyBreadcrumb: {
                label: 'Home',
                skip:true
            }
        })
        .state('cd', {
            url: '/cd/:id',
            templateUrl: 'views/cd.html',
            controller: 'CdCtrl',
            ncyBreadcrumb: {
                parent:'perfil({id:cd.artista.id})',
                label: 'CD'
            }
        })
        .state('perfil', {
            url: '/perfil/:id',
            controller: 'PerfilCtrl',
            templateUrl: 'views/profile.html',
            ncyBreadcrumb: {
                parent:'home',
                label: 'Perfil'
            }
        })
        .state('evento', {
            url: '/evento/:id',
            controller: 'EventoCtrl',
            templateUrl: 'views/evento.html',
            ncyBreadcrumb: {
                parent:'home',
                label: 'Evento'
            }
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signup.html',
            controller: 'SignUpCtrl',
            ncyBreadcrumb: {
                parent:'home',
                label: 'Cadastre-se'
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            ncyBreadcrumb: {
                parent:'home',
                label: 'Login'
            }
        }).
        state('painel', {
            url: '/painel',
            abstract: true,
            templateUrl: 'views/painel/painel.html',
            ncyBreadcrumb: {
                parent:'home',
                label: 'Painel de Controle'
            }
        }).
        state('novo_cd', {
            parent: "painel",
            url: '/cd/novo',
            controller: 'NovoCDCtrl',
            templateUrl: 'views/painel/cd_form.html',
            ncyBreadcrumb: {
                label: 'Novo CD'
            }
        }).
        state('editar_cd', {
            parent: "painel",
            url: '/cd/edit/:id',
            controller: 'EditCDCtrl',
            templateUrl: 'views/painel/cd_form.html',
            ncyBreadcrumb: {
                label: 'Editar CD'
            }
        }).
        state('meus_cds', {
            parent: "painel",
            url: '/cds',
            controller: 'MeusCDsCtrl',
            templateUrl: 'views/painel/cds.html',
            ncyBreadcrumb: {
                label: 'Meus CDs'
            }
        }).
        state('novo_evento', {
            parent: "painel",
            url: '/eventos/novo',
            controller: 'NovoEventoCtrl',
            templateUrl: 'views/painel/novo_evento.html',
            ncyBreadcrumb: {
                label: 'Novo Evento'
            }
        }).
        state('editar_evento', {
            parent: "painel",
            url: '/eventos/edit/:id',
            controller: 'NovoEventoCtrl',
            templateUrl: 'views/painel/novo_evento.html',
            ncyBreadcrumb: {
                label: 'Editar Evento'
            }
        }).
        state('meus_eventos', {
            parent: "painel",
            url: '/eventos',
            controller: 'MeusEventosCtrl',
            templateUrl: 'views/painel/meus_eventos.html',
            ncyBreadcrumb: {
                label: 'Meus Eventos'
            }
        }).
        state('config', {
            parent: "painel",
            url: '/config',
            controller: 'ConfigsCtrl',
            templateUrl: 'views/painel/config.html',
            ncyBreadcrumb: {
                label: 'Editar Conta'
            }
        }).
        state('config_password', {
            parent: "painel",
            url: '/config/password',
            controller: 'ConfigPasswordCtrl',
            templateUrl: 'views/painel/config_password.html',
            ncyBreadcrumb: {
                label: 'Configurar Senha'
            }
        })
        .state('genero', {
            url: '/genero/:id',
            controller: 'GeneroCtrl',
            templateUrl: 'views/genero.html',
            ncyBreadcrumb: {
                parent:'home',
                label: 'Gênero'
            }
        }).state('eventos', {
            url: '/eventos',
            controller: 'EventosCtrl',
            templateUrl: 'views/eventos.html',
            ncyBreadcrumb: {
                parent:'home',
                label: 'Eventos'
            }
        }).state('busca', {
            url: '/busca/:q',
            controller: 'BuscaCtrl',
            templateUrl: 'views/busca.html',
            ncyBreadcrumb: {
                parent:'home',
                label: 'Busca'
            }
        }).state('termos', {
            url: '/termos',
            templateUrl: 'views/termos.html',
            ncyBreadcrumb: {
                parent:'home',
                label: 'Termos de Uso'
            }
        }).state('privacidade', {
            url: '/privacidade',
            templateUrl: 'views/policies.html',
            ncyBreadcrumb: {
                parent:'home',
                label: 'Política de privacidade'
            }
        }).state('sobre', {
            url: '/sobre',
            templateUrl: 'views/sobre.html',
            ncyBreadcrumb: {
                parent:'home',
                label: 'Sobre'
            }
        }).state('contato', {
            url: '/contato',
            templateUrl: 'views/contato.html',
            ncyBreadcrumb: {
                parent:'home',
                label: 'Contato'
            }
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
    .config(function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.17',
            libraries: ''
        });
    })
    .config(function (blockUIConfig) {
        blockUIConfig.autoBlock = false;
        blockUIConfig.resetOnException = false;
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
    }).constant('angularMomentConfig', {
        calendar: {
            lastDay: '[Yesterday at] LT',
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            lastWeek: '[last] dddd [at] LT',
            nextWeek: 'dddd [at] LT',
            sameElse: 'L LT'
        }
    }).config(function ($breadcrumbProvider) {
        $breadcrumbProvider.setOptions({
            templateUrl: 'views/breadcrumb.html',
            includeAbstract:true
        });
    });
