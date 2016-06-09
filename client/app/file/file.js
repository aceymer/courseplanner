'use strict';

angular.module('courseplannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('file', {
        url: '/file/:id/:action',
        template: '<file layout-fill></file>'
      });
  });
