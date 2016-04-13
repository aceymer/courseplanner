'use strict';

describe('Controller: UserCtrl', function () {

  // load the controller's module
  beforeEach(module('courseplannerApp'));

  var UserCtrl, scope;
  var stateModels = [{}, {}, {}];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, User) {
    scope = $rootScope.$new();
    this.User = User;
    UserCtrl = $controller('UserCtrl', {
      $scope: scope,
      users: stateModels
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
