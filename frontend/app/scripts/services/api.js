'use strict';

/**
 * @ngdoc service
 * @name musicaApp.Api
 * @description
 * # Api
 * Service in the musicaApp.
 */
angular.module('musicaApp').service('api', ['ws', api]);
function api(ws) {
    var api = this;
    api.getEstados = function (cb) {
        ws.consumeService("data/estados", null, null, cb, false, "GET");
    };
    api.getHome = function (cb) {
        ws.consumeService("data/home", null, null, cb, false, "GET");
    };
    api.getGeneros = function (cb) {
        ws.consumeService("data/generos", null, null, cb, false, "GET");
    };
    api.signup = function (user, cb) {
        ws.consumeService("usuarios/create", user, null, cb, false);
    };
    api.login = function (user, cb) {
        ws.consumeService("user/login", user, null, cb, false);
    };
    api.lookup = function (token, cb) {
        ws.consumeService("usuarios/lookup", null, token, cb, false);
    };
    api.addCd = function (token, cd, cb) {
        ws.consumeService("cd/add", cd, token, cb, false);
    };
}
