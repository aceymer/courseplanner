'use strict';

angular.module('courseplannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('file', {
        url: '/file',
        template: '<file></file>'
      });
  });
