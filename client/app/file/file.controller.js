'use strict';
(function() {

  function FileComponent($state, $stateParams, $mdToast, Util, Auth, FolderService, Upload) {
    var ctrl = this;

    function init() {
      if ($stateParams.id) {
        ctrl.breadCrumb = [];
        FolderService.path({
          id: $stateParams.id
        }, function(folders) {
          if (folders && folders.length > 0) {
            ctrl.selectedFolder = folders[folders.length - 1];
            ctrl.breadCrumb = folders;
          }
        });
      } else {
        Auth.getCurrentUser(function(user) {
          if (user.rootFolder) {
            var ids = [];
            ids.push(user.rootFolder._id);
            ids = Util.encodeUrlIds(ids);
            $state.transitionTo('file', {
              id: ids
            });
          }
        });
      }
      if ($stateParams.action) {
        ctrl.action = $stateParams.action;
      }
    }
    ctrl.$onInit = init;

    ctrl.openTheFolder = function(folder, action) {
      var ids = Util.decodeUrlIds($stateParams.id);
      ids.push(folder._id);
      ids = Util.encodeUrlIds(ids);
      $state.transitionTo('file', {
        id: ids,
        action: action
      });

    };

    ctrl.breadCrumbBack = function(folder, action) {
      var ids = Util.decodeUrlIds($stateParams.id);
      ids.forEach(function(stored) {
        if (stored === folder._id) {
          ids.length = ids.indexOf(stored) + 1;
        }
      });
      ids = Util.encodeUrlIds(ids);
      $state.transitionTo('file', {
        id: ids,
        action: action
      });
    };

    ctrl.deleteItem = function(item) {
      if (!item.url) {
        //Item is a folder
        FolderService.delete({
          id: item._id
        }, function() {
          ctrl.openTheFolder(ctrl.selectedFolder);
        });
      } else {
        //Item is a file
        _.remove(ctrl.selectedFolder.files, function(file) {
          return item._id === file._id;
        });
        FolderService.update({
          id: ctrl.selectedFolder._id
        }, ctrl.selectedFolder, function() {
          ctrl.openTheFolder(ctrl.selectedFolder);
        });
      }

    };

    ctrl.changeAction = function(action) {
      ctrl.breadCrumbBack(ctrl.selectedFolder, action);
    };

    ctrl.addFolder = function(folderName) {
      var newChildFolder = {
        name: folderName
      };
      FolderService.save({
        id: ctrl.selectedFolder._id
      }, newChildFolder, function() {
        ctrl.openTheFolder(ctrl.selectedFolder);
      });
    };

    ctrl.upload = function(file) {
      file.uploading = true;
      file.created = Date.now;
      ctrl.selectedFolder.files.push(file);
      Upload.upload({
          url: '/api/folders/upload/'+ ctrl.selectedFolder._id,
          data: {
            file: file
          }
        }).then(function () {
          var toast = $mdToast.simple()
            .textContent('File upload')
            .action('OK')
            .highlightAction(true)
            .position('left');
          $mdToast.show(toast);
          ctrl.openTheFolder(ctrl.selectedFolder);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            file.determinateValue = parseInt(100.0 * evt.loaded / evt.total);
        });
    };

  }

  angular.module('courseplannerApp')
    .component('file', {
      templateUrl: 'app/file/file.html',
      controller: FileComponent
    });

})();
