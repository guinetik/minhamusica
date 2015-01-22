'use strict';

/**
 * @ngdoc service
 * @name musicaApp.auth
 * @description
 * # auth
 * Factory in the musicaApp.
 */
angular.module('musicaApp')
  .factory('auth', function ($window, $rootScope, api) {
    var storage = $window.localStorage;
    var cachedToken;
    var cachedUser;
    return {
      setToken: function (token) {
        cachedToken = token;
        storage.setItem('userToken', token);
      },
      getToken: function () {
        if (!cachedToken)
          cachedToken = storage.getItem('userToken');
        return cachedToken;
      },
      isAuthenticated: function () {
        return !!this.getToken();
      },
      logout: function () {
        storage.removeItem('userToken');
        cachedToken = null;
      },
      getUser:function(token) {
        if(cachedUser) {
          return cachedUser;
        } else {
          var cb = function (result){
            if(result.status == 200) {
              cachedUser = result.data;
              $rootScope.$emit("user-lookup", result.data);
            }
          };
          api.lookup(token, cb);
          return cb;
        }
      }
    };
  });
