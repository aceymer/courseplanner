'use strict';

function ExplorerFolderController() {
  var ctrl = this;

  ctrl.select = function(){
    ctrl.onSelect(ctrl.folder);
  };

  ctrl.open = function(){
    ctrl.onOpen(ctrl.folder);
  };
}

angular.module('fileExplorer').component('explorerFolder', {
  templateUrl: 'components/file-explorer/file-explorer-folder.html',
  controller: ExplorerFolderController,
  bindings: {
    folder: '<',
    onSelect: '&',
    onOpen: '&'
  }
});
