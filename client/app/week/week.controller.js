'use strict';

angular.module('courseplannerApp')
  .controller('WeekCtrl', function ($scope, $stateParams, SyllabusService) {
    SyllabusService.get({id:$stateParams.id}, function(syllabus) {
      $scope.syllabus = syllabus;
    });
  });
