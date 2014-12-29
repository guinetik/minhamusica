'use strict';

describe('Controller: RegistercrlCtrl', function () {

  // load the controller's module
  beforeEach(module('front2App'));

  var RegistercrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegistercrlCtrl = $controller('RegistercrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
