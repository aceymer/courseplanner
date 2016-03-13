'use strict';

angular.module('courseplannerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user',
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl'
      })
      .state('userdetails', {
        url: '/user/:id',
        templateUrl: 'app/user/user-details.html',
        controller: 'UserDetailsCtrl'
      });
  });
