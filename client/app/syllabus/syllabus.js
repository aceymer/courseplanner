'use strict';

angular.module('courseplannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('syllabus', {
        url: '/syllabus',
        templateUrl: 'app/syllabus/syllabus.html',
        controller: 'SyllabusCtrl'
      });
  });
