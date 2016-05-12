'use strict';

function ExplorerFileController() {
  var ctrl = this;

  ctrl.getImage = function(){
    var fileExt = ctrl.file.name.split('.');
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
      default:
        return 'fa-file-o';
    }
  };

  ctrl.select = function(){
    ctrl.onSelect(ctrl.file);
  };
}

angular.module('courseplannerApp').component('explorerFile', {
  templateUrl: 'components/file-explorer/file-explorer-file.html',
  controller: ExplorerFileController,
  bindings: {
    file: '<',
    onSelect: '&'
  }
});
