'use strict';

describe('Directive: emailValidate', function () {

  // load the directive's module
  beforeEach(module('musicaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<email-validate></email-validate>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the emailValidate directive');
  }));
});
