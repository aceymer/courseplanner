'use strict';

function ExplorerBreadCrumbController() {
  var ctrl = this;

  ctrl.breadCrumb = [];

  ctrl.goBack = function(folder){
    ctrl.breadCrumbBack({$value: folder});
  };

  ctrl.delete = function(){
    ctrl.deleteItem();
  };

  ctrl.add = function(){
    ctrl.addItem();
  };
}

angular.module('fileExplorer').component('explorerBreadCrumb', {
  templateUrl: 'components/file-explorer/file-explorer-breadcrumb.html',
  controller: ExplorerBreadCrumbController,
  bindings: {
    breadCrumb:'<',
    selectedItem: '<',
    action: '<',
    breadCrumbBack: '&',
    deleteItem: '&',
    addItem: '&',
    cancel: '&'
  }
});
