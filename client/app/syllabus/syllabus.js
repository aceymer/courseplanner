'use strict';

angular.module('courseplannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/syllabus/syllabus.html',
        controller: 'SyllabusCtrl'
      });
  });
