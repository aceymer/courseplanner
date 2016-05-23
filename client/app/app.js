'use strict';

angular.module('courseplannerApp', [
  'courseplannerApp.auth',
  'courseplannerApp.admin',
  'courseplannerApp.constants',
  'fileExplorer',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ngMaterial',
  'ngMessages',
  'angularUtils.directives.dirPagination',
  'ngAnimate',
  'ngFileUpload',
  'ngImgCrop',
  'lz-string',
  'base64'
])
  .config(function($urlRouterProvider, $locationProvider, $mdThemingProvider) {
    $urlRouterProvider
      .otherwise('/');
      $mdThemingProvider.theme('error-toast');
    $locationProvider.html5Mode(true);
  });
