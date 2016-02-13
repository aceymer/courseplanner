'use strict';

describe('Controller: WeekCtrl', function () {

  // load the controller's module
  beforeEach(module('courseplannerApp'));

  var WeekCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WeekCtrl = $controller('WeekCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
