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
    var cachedToken= "-1";;
    var cachedUser;
    return {
      setToken: function (token) {
        cachedToken = token;
        storage.setItem('userToken', token);
      },
      getToken: function () {
        if (cachedToken == "-1") cachedToken = storage.getItem('userToken');
        return cachedToken;
      },
      isAuthenticated: function () {
        //console.log("isAuth");
        return this.getToken() != "-1";
      },
      logout: function () {
        storage.removeItem('userToken');
        cachedToken = "-1";
        $rootScope.$emit("update-user-token", "-1");
      },
      getUser: function (token) {
        if (cachedUser) {
          return cachedUser;
        } else {
          var cb = function (result) {
            if (result.status == 200) {
              cachedUser = result.data;
              $rootScope.$emit("user-lookup", result.data);
            } else {
              //console.log("getUser errror");
              storage.removeItem('userToken');
              cachedToken = "-1";
              $rootScope.$emit("update-user-token", "-1");
            }
          };
          api.lookup(token, cb);
          return cb;
        }
      }
    };
  });
