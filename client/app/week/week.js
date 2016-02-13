'use strict';

angular.module('courseplannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('week', {
        url: '/week/:id',
        templateUrl: 'app/week/week.html',
        controller: 'WeekCtrl'
      });
  });
