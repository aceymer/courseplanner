'use strict';

angular.module('courseplannerApp', [
  'courseplannerApp.auth',
  'courseplannerApp.admin',
  'courseplannerApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ngMaterial',
  'ngMessages',
  'angularUtils.directives.dirPagination'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
