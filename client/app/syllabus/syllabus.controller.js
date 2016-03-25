'use strict';

angular.module('courseplannerApp')
  .controller('SyllabusCtrl', function($scope, $state, SyllabusService, socket, Auth) {
    $scope.isAuthenticated = Auth.isLoggedIn;
    $scope.propToSortOn = 'title';
    $scope.reverse = false;

    $scope.sort = function(keyname){
       $scope.propToSortOn = keyname;
       $scope.reverse = !$scope.reverse;
     }

    $scope.isOwner = function(syllabus){
      return Auth.getCurrentUser()._id === syllabus.owner._id;
    }

    SyllabusService.query(function(syllabuses) {
      $scope.syllabuses = syllabuses;
      socket.syncUpdates('syllabus', $scope.syllabuses);
    });
    $scope.createSyllaus = function() {

      //Owner added v0.2.19
      $scope.newSyllabus.owner =  Auth.getCurrentUser();

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
