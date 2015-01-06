'use strict';

/**
 * @ngdoc directive
 * @name musicaApp.directive:emailValidate
 * @description
 * # emailValidate
 */
angular.module('musicaApp')
.directive('emailValidate', function () {
 	
	var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[A-Za-z]+\.[A-Za-z]+$/i;	
	
	return {
      require: 'ngModel',
      restrict: '',
      link: function(scope, element, attrs, ctrl) {
       
		  if(ctrl && ctrl.$validators.email){
		  	 // sobrescrevendo a função de email do angular  
			 ctrl.$validators.email = function(modelValue){
			 	return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
			 } 
		  
		  }
		  
      }
    };
  });
