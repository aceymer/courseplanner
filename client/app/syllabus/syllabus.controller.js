'use strict';

angular.module('courseplannerApp')
  .controller('SyllabusCtrl', function($scope, $state, SyllabusService, socket) {
    SyllabusService.query(function(syllabuses) {
      $scope.syllabuses = syllabuses;
      socket.syncUpdates('syllabus', $scope.syllabuses);
    });
    $scope.createSyllaus = function() {
      SyllabusService.save($scope.newSyllabus, function(syllabus) {
        $scope.newSyllabus = {};

      })
    }

    $scope.deleteSyllabus = function(syllabus) {
      SyllabusService.delete({
        id: syllabus._id
      }, function(syllabus) {
        console.log("Syllabus deletred");
      });
    }

    $scope.goToSyllabus = function(syllabus) {

      $state.go('week', {
        id: syllabus._id
      });
    }

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('syllabus');
    });
  });
