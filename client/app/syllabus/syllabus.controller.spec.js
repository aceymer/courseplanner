'use strict';

describe('Controller: SyllabusCtrl', function () {

  // load the controller's module
  beforeEach(module('courseplannerApp'));

  var SyllabusCtrl, scope;
  var stateModels = [{}, {}, {}];
  var Auth = {
    isLoggedIn : function(){return true;}
  };


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SyllabusCtrl = $controller('SyllabusCtrl', {
      $scope: scope,
      syllabuses: stateModels,
      Auth
    });
  }));
  it('should ...', function () {
    expect(1).toEqual(1);
  });

  it('should provide auth info', function () {
    expect(scope.isAuthenticated()).toEqual(Auth.isLoggedIn());
  });
});
