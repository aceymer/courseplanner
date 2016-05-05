'use strict';
angular.module('courseplannerApp')
  .controller('SettingsController', function($scope, $state, $mdToast, Auth, ImageService) {
    $scope.errors = {};
    $scope.submitted = false;
    $scope.Auth = Auth;
    $scope.user = $scope.Auth.getCurrentUser();
    /**
     * Profile Photo Upload scope variables
     */
    $scope.image = {
      originalImage: '',
      croppedImage: ''
    };
    $scope.loading = false;

    $scope.readFileImg = function(files) {
      $scope.user.photo = undefined;
      if (files && files.length) {
        ImageService.readImageFile(files[0], function(err, img) {
          if (err) {
            var toast = $mdToast.simple()
              .textContent('Image not saved')
              .action('Error')
              .highlightAction(false)
              .position('top')
              .theme('error-toast');
            return $mdToast.show(toast);
          }
          $scope.image.originalImage = img;
        });
      }
    };

    $scope.upload = function() {
      if ($scope.image.croppedImage) {
        $scope.loading = true;
        Auth.updateProfilePhoto($scope.image.croppedImage,
          function(user) {
            if(user){
              $scope.user = user;
              var toast = $mdToast.simple()
                .textContent('Photo saved')
                .action('OK')
                .highlightAction(true)
                .position('left');
              $mdToast.show(toast);
            }
            $scope.loading = false;
          }
        );
      }
    };

    $scope.changePassword = function(form) {
      if (form.$valid) {
        $scope.Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(() => {
            $scope.message = 'Password successfully changed.';
          })
          .catch(() => {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
            $scope.message = '';
          });
      }
    };
  });
