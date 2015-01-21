'use strict';

/**
 * @ngdoc service
 * @name musicaApp.Api
 * @description
 * # Api
 * Service in the musicaApp.
 */
angular.module('musicaApp').service('api', ['ws', 'auth', api]);
function api(ws, auth) {
  var api = this;
  api.getEstados = function(cb) {
    ws.consumeService("data/estados", null, null, cb, false, "GET");
  };
  api.signup = function(user, cb) {
    ws.consumeService("usuarios/create", user, null, cb, false);
  };
  api.login = function(user, cb) {
    ws.consumeService("user/login", user, null, cb, false);
  }
}
