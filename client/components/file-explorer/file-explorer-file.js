'use strict';

function ExplorerFileController() {
  var ctrl = this;

  ctrl.getImage = function(file){
    if(file){
      var fileExt = file.name.split('.');
      if(fileExt.length > 1){
        fileExt = fileExt[fileExt.length - 1];
      }
      switch (fileExt) {
        case 'docx' || 'doc':
          return 'fa-file-word-o';
        case 'pdf':
          return 'fa-file-pdf-o';
        case 'txt':
          return 'fa-file-text-o';
        case 'png':
          return 'fa-file-image-o';
        default:
          return 'fa-file-o';
      }
    }
  };

  ctrl.select = function(){
    ctrl.onSelect(ctrl.file);
  };
}

angular.module('fileExplorer').component('explorerFile', {
  templateUrl: 'components/file-explorer/file-explorer-file.html',
  controller: ExplorerFileController,
  bindings: {
    file: '<',
    onSelect: '&'
  }
});
