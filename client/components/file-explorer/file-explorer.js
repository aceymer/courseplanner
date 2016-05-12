'use strict';

function ExplorerController() {
  var ctrl = this;

  ctrl.selected = undefined;

  ctrl.folderHiearchy = [];


  // This would be loaded by $http etc.
  ctrl.selectedFolder = {
    _id: '1',
    name: 'Documents',
    folders: [{
      _id: '2',
      name: 'childFolder1'
    }, {
      _id: '77',
      name: 'childFolder2'
    }, {
      _id: '278',
      name: 'childFolder3'
    }, {
      _id: '3',
      name: 'childFolder4'
    }, {
      _id: '4',
      name: 'childFolder5'
    }],
    files: [{
      _id: '5',
      name: 'text.txt',
      size: '68kb',
      created: '10-10-2015'
    }, {
      _id: '6',
      name: 'doc.docx',
      size: '102kb',
      created: '10-12-2015'
    }, {
      _id: '7',
      name: 'info.pdf',
      size: '1.2MB',
      created: '22-12-2015'
    }]
  };

  ctrl.anotherFolder = {
    _id: '2',
    name: 'Documents level 2',
    folders: [{
      _id: '23',
      name: 'childFolder1'
    }, {
      _id: '773',
      name: 'childFolder2'
    }, {
      _id: '2783',
      name: 'childFolder3'
    }],
    files: [{
      _id: '53',
      name: 'text.txt',
      size: '68kb',
      created: '10-10-2015'
    }, {
      _id: '63',
      name: 'doc.docx',
      size: '102kb',
      created: '10-12-2015'
    }]
  };

  ctrl.folderHiearchy.push(ctrl.selectedFolder);

  ctrl.select = function(selected) {
    if (ctrl.selectedItem) {
      ctrl.selectedItem.selected = undefined;
    }
    ctrl.selectedItem = selected;
    ctrl.selectedItem.selected = true;
  };

  ctrl.openFolder = function(folder) {
    if (ctrl.selectedItem) {
      ctrl.selectedItem.selected = undefined;
    }

    console.log(folder);
    ctrl.selectedFolder = ctrl.anotherFolder;
    ctrl.folderHiearchy.push(ctrl.anotherFolder);
  };

  ctrl.select(ctrl.selectedFolder);

}

angular.module('courseplannerApp').component('fileExplorer', {
  templateUrl: 'components/file-explorer/file-explorer.html',
  controller: ExplorerController
});
