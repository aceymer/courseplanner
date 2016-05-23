'use strict';

function ExplorerBreadCrumbController() {
  var ctrl = this;

  ctrl.breadCrumb = [];

  ctrl.goBack = function(folder){
    ctrl.breadCrumbBack({$value: folder});
  };
}

angular.module('fileExplorer').component('explorerBreadCrumb', {
  templateUrl: 'components/file-explorer/file-explorer-breadcrumb.html',
  controller: ExplorerBreadCrumbController,
  bindings: {
    breadCrumb:'<',
    breadCrumbBack: '&'
  }
});
