'use strict';

angular.module('courseplannerApp.auth', [
  'courseplannerApp.constants',
  'courseplannerApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
