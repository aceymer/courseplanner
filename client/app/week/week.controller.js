'use strict';

angular.module('courseplannerApp')
  .controller('WeekCtrl', function ($scope, $stateParams, SyllabusService) {
    SyllabusService.get({id:$stateParams.id}, function(syllabus) {
      $scope.syllabus = syllabus;
    });

    $scope.goBack = function(){
      window.history.back();
    };

    $scope.editWeekPlan = function(weekplan){
      $scope.editingWeekplan = weekplan;
    };

    $scope.undoWeekplanEdit = function(){
      $scope.editingWeekplan = undefined;
    }

  });
