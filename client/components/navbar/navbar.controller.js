'use strict';

function navbarController($base64, $state, Auth, Util) {
  var ctrl = this;
  ctrl.isLoggedIn = Auth.isLoggedIn;
  ctrl.isAdmin = Auth.isAdmin;
  ctrl.getCurrentUser = Auth.getCurrentUser;

  ctrl.goToFile = function(){
    ctrl.getCurrentUser(function(user){
      if(user.rootFolder){
        var ids = [];
        ids.push(user.rootFolder._id);
        ids = Util.encodeUrlIds(ids);
        $state.go('file', {id:ids});
      }
    });
  };

  //start-non-standard
  ctrl.menu = [{
    'title': 'Home',
    'state': 'main'
  }];

  ctrl.isCollapsed = true;
  //end-non-standard
}

angular.module('courseplannerApp')
  .controller('NavbarController', navbarController);
