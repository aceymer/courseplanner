'use strict';

angular.module('courseplannerApp')
  .controller('UserDetailsCtrl', function ($scope, $state, $stateParams, $mdToast, socket, Auth, User, appConfig) {
    $scope.isAuthenticated = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;

    $scope.userRoles = appConfig.userRoles;
    User.get({id:$stateParams.id}, function(user) {
      $scope.user = user;
    });

    $scope.saveUser = function(){
      User.update({
        id: $scope.user._id
      }, $scope.user, function(user) {
        $scope.user = user;

        var toast = $mdToast.simple()
          .textContent('User saved, you may have to log in again.')
          .action('OK')
          .highlightAction(false)
          .position('top');
        $mdToast.show(toast);
      });
    }


    $scope.goBack = function(){
      window.history.back();
    };


  });
