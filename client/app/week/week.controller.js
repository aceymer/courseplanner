'use strict';

angular.module('courseplannerApp')
  .controller('WeekCtrl', function ($scope, $stateParams, $mdDialog, $mdToast, SyllabusService, Auth) {

    //Added in tag v2.1.15
    $scope.isAdmin = Auth.isAdmin;

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

        SyllabusService.update({
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

    //Added in tag v2.1.14 ------- from ----
    $scope.newWeekplan = {};

    $scope.addWeekplan = function(form) {
      if (form.$valid) {
        $scope.newWeekplan.enabled = true;
        $scope.syllabus.weekplans.push($scope.newWeekplan);
        SyllabusService.update({
          id: $scope.syllabus._id
        }, $scope.syllabus, function(syllabus) {
          $scope.syllabus = syllabus;
          form.$setPristine();
          form.$setUntouched();
          var toast = $mdToast.simple()
            .textContent('Weekplan created')
            .action('OK')
            .highlightAction(false)
            .position('top');
          $mdToast.show(toast);
        });
      }
    };
    //Added in tag v2.1.14 ------- to ----

  });
