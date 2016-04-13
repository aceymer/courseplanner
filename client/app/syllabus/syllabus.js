'use strict';

angular.module('courseplannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/syllabus/syllabus.html',
        controller: 'SyllabusCtrl',
        resolve: {
          syllabuses: function(SyllabusService) {
            return SyllabusService.paged(
              { page: 1,
                limit: 25,
                sortBy: 'title'});
          }
        }
      });
  });
