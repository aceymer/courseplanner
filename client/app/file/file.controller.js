'use strict';
(function() {

  function FileComponent($state, $stateParams, Util, Auth, FolderService) {
    var ctrl = this;

    function init() {
      if ($stateParams.id) {
        ctrl.breadCrumb = [];
        FolderService.path({
          id: $stateParams.id
        }, function(folders) {
          if(folders && folders.length > 0){
            ctrl.selectedFolder = folders[folders.length-1];
            ctrl.breadCrumb = folders;
          }
        });
      } else{
        Auth.getCurrentUser(function(user){
          if(user.rootFolder){
            var ids = [];
            ids.push(user.rootFolder._id);
            ids = Util.encodeUrlIds(ids);
            $state.transitionTo('file', {
              id: ids
            });
          }
        });
      }
    }
    ctrl.$onInit = init;

    ctrl.openTheFolder = function(folder) {
      var ids = Util.decodeUrlIds($stateParams.id);
      ids.push(folder._id);
      ids = Util.encodeUrlIds(ids);
      $state.transitionTo('file', {
        id: ids
      });

    };

    ctrl.breadCrumbBack = function(folder) {
      var ids = Util.decodeUrlIds($stateParams.id);
      ids.forEach(function(stored){
        if(stored === folder._id){
          ids.length= ids.indexOf(stored) + 1;
        }
      });
      ids = Util.encodeUrlIds(ids);
      $state.transitionTo('file', {
        id: ids
      });
    };
  }

  angular.module('courseplannerApp')
    .component('file', {
      templateUrl: 'app/file/file.html',
      controller: FileComponent
    });

})();
