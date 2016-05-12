'use strict';

describe('Component: FileComponent', function () {

  // load the controller's module
  beforeEach(module('courseplannerApp'));

  var FileComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    FileComponent = $componentController('FileComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
