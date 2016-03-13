'use strict';

angular.module('courseplannerApp')
  .controller('UserDetailsCtrl', function ($scope, $state, $stateParams, socket, Auth, User) {
    $scope.isAuthenticated = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;

    User.get({id:$stateParams.id}, function(user) {
      $scope.user = user;
      console.log('uswr', user);
    });

    $scope.goBack = function(){
      window.history.back();
    };


  });
