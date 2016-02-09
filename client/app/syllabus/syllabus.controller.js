'use strict';

angular.module('courseplannerApp')
  .controller('SyllabusCtrl', function ($scope, SyllabusService, socket) {
    SyllabusService.query(function(syllabuses){
        $scope.syllabuses = syllabuses;
        socket.syncUpdates('syllabus', $scope.syllabuses);
    });
    $scope.createSyllaus = function(){
      SyllabusService.save($scope.newSyllabus, function(syllabus) {
        $scope.newSyllabus = {};

      })
    }

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('syllabus');
    });
  });
