'use strict';

function ExplorerAddController() {
  var ctrl = this;

  ctrl.add = function(){
    
    ctrl.addFolder({$value: ctrl.folderName});
  };

}

angular.module('fileExplorer').component('fileExplorerAdd', {
  templateUrl: 'components/file-explorer/file-explorer-add.html',
  controller: ExplorerAddController,
  bindings: {
    addFolder:'&'
  }

});
