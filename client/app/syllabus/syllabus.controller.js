'use strict';

angular.module('courseplannerApp')
  .controller('SyllabusCtrl', function ($scope, SyllabusService) {
    $scope.createSyllaus = function(){
      SyllabusService.save($scope.newSyllabus, function(syllabus) {
        console.log(syllabus);
      })
    }
  });
