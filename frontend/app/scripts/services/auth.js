'use strict';

/**
 * @ngdoc service
 * @name musicaApp.auth
 * @description
 * # auth
 * Factory in the musicaApp.
 */
angular.module('musicaApp')
  .factory('auth', function($window) {
    
	var storage = $window.localStorage;
	var cachedToken;
    return {
      setToken: function(token) {
      	cachedToken = token;
		storage.setItem('userToken', token);
      },
	  getToken: function(){
	  	  if(!cachedToken)
		  	cachedToken = storage.getItem('userToken');
		  return cachedToken;
	  },
	  isAuthenticated : function(){
		  return !!this.getToken();
	  },
	  logout : function(){
	  	storage.removeItem('userToken');
	  }
	};
  });