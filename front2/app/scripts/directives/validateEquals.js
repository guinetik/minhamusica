'use strict';

/**
 * @ngdoc directive
 * @name front2App.directive:validateEquals
 * @description
 * # validateEquals
 */
angular.module('front2App')
  .directive('validateEquals', function () {
    return {
     	require : 'ngModel' ,
		link : function(scope , elements , attrs , ngModelCtrl){
			
			function validateEqual(value){
				ngModelCtrl.$setValidity('equal' , valid);
				
				var valid = (value === scope.$eval(attrs.validateEquals));
				return valid ?  value : undefined ; 
			}
			
			ngModelCtrl.$parsers.push(validateEqual);
			ngModelCtrl.$formatters.push(validateEqual);
			
			scope.$watch(attrs.validateEquals, function(){
			
				ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
			
			})
		
		}
		
      }
  });
