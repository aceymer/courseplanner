'use strict';

angular.module('courseplannerApp')
  .controller('WeekCtrl', function ($scope, $stateParams, $mdDialog, SyllabusService) {
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

    $scope.deleteWeekPlan = function(weekplan, event) {
      var confirm = $mdDialog.confirm()
        .title('Delete Weekplan')
        .textContent('Are you sure you want to delete the Weekplan')
        .ariaLabel('Delete')
        .targetEvent(event)
        .openFrom('#right')
        .ok('Please do it!')
        .cancel('No I changed my mind');
      $mdDialog.show(confirm).then(function() {
        _.remove($scope.syllabus.weekplans, function(plan) {
          return plan._id === $scope.editingWeekplan._id;
        });

        Syllabus.update({
          id: $scope.syllabus._id
        }, $scope.syllabus, function(syllabus) {
          $scope.syllabus = syllabus;
          var toast = $mdToast.simple()
            .textContent('Weekplan Deleted')
            .action('OK')
            .highlightAction(false)
            .position('top');
          $mdToast.show(toast);
          $scope.editingWeekplan = undefined;
        });
      });
    };

  });
