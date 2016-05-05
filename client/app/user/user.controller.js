'use strict';

angular.module('courseplannerApp')
  .controller('UserCtrl', function ($scope, $state, socket, Auth, User, users) {
    $scope.isAuthenticated = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;

    function initialSetup(){
      $scope.users = users;
      socket.syncUpdates('user', $scope.users);
    }

    $scope.goToUser = function(user) {

      $state.go('userdetails', {
        id: user._id
      });
    };

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('user');
    });

    initialSetup();
  });
