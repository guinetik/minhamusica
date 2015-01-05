'use strict';

/**
 * @ngdoc directive
 * @name musicaApp.directive:emailValidate
 * @description
 * # emailValidate
 */
angular.module('musicaApp')
  .directive('emailValidate', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the emailValidate directive');
      }
    };
  });
