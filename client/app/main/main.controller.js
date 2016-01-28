'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.syllabyses = [];

    $http.get('/api/syllabuses').then(response => {
      this.syllabyses = response.data;
      socket.syncUpdates('syllabuses', this.syllabyses);
    });

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('courseplannerApp')
  .controller('MainController', MainController);

})();
