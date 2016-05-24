'use strict';

function ExplorerController() {
  var ctrl = this;

  ctrl.breadCrumb = [];

  ctrl.$onChanges = function(object){
    if(object.breadCrumb && object.breadCrumb.currentValue){
      if(ctrl.selectedItem){
        ctrl.selectedItem.selected = undefined;
      }
    }
  };

  ctrl.select = function(selected) {
    if (ctrl.selectedItem) {
      ctrl.selectedItem.selected = undefined;
    }
    ctrl.selectedItem = selected;
    ctrl.selectedItem.selected = true;
  };

  ctrl.openFolder = function(folder) {
    ctrl.open({$value: folder});
  };

  ctrl.goBack = function(folder){
    ctrl.breadCrumbBack({$value: folder});
  };

  ctrl.delete = function(){
    ctrl.deleteItem({$value: ctrl.selectedItem});
  };

  ctrl.change = function(value){
    ctrl.changeAction({$value: value});
  };
  ctrl.addNewFolder = function(value){
    ctrl.addFolder({$value: value});
  };
}

angular.module('fileExplorer').component('fileExplorer', {
  templateUrl: 'components/file-explorer/file-explorer.html',
  controller: ExplorerController,
  bindings: {
    folder:'<',
    breadCrumb:'<',
    selectedItem: '<',
    action: '<',
    open: '&',
    breadCrumbBack: '&',
    deleteItem: '&',
    changeAction: '&',
    addFolder:'&'
  }

});
