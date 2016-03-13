'use strict';

angular.module('courseplannerApp')
  .controller('UserCtrl', function ($scope, $state, socket, Auth, User) {
    $scope.isAuthenticated = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;

    User.query(function(users) {
      $scope.users = users;
      socket.syncUpdates('user', $scope.users);
    });


    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('user');
    });

  });
