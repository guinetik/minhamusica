'use strict';

/**
 * @ngdoc service
 * @name front2App.alert
 * @description
 * # alert
 * Service in the front2App.
 */
angular.module('front2App')
  .service('alert', function ($rootScope ,$timeout) {		
	var alertTimeout;
	return function(type, title, message, timeout){
		$rootScope.alert = {
			hasBeenShown: true ,
			show : true , 
			type : type,
			message : message ,
			title : title 
			
		};
		
		$timeout.cancel(alertTimeout);
		alertTimeout  =$timeout(function(){
			$rootScope.alert.show =false ;
		} , timeout || 2000);
		
	}
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
