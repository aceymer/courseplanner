'use strict';

(function() {

class AdminController {
  constructor(User) {
    // Use the User $resource to fetch all users
    this.users = User.query();
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('courseplannerApp.admin')
  .controller('AdminController', AdminController);

})();


/*
'use strict';

angular.module('courseplannerApp.admin')
  .controller('AdminController', function($scope, $state, User, Auth, socket) {
    $scope.isAuthenticated = Auth.isLoggedIn;
    $scope.users = User.query(function(users) {
      $scope.users = users;
      socket.syncUpdates('user', $scope.syllabuses);
    });


    $scope.delete = function(user) {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    };

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('user');
    });
  });
*/
