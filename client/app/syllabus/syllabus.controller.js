'use strict';

angular.module('courseplannerApp')
  .controller('SyllabusCtrl', function ($scope, SyllabusService) {
    SyllabusService.query(function(syllabuses){
        $scope.syllabuses = syllabuses;
    });
    $scope.createSyllaus = function(){
      SyllabusService.save($scope.newSyllabus, function(syllabus) {
        console.log(syllabus);
      })
    }
  });
