'use strict';

angular.module('courseplannerApp')
  .controller('SyllabusCtrl', function ($scope) {
    $scope.createSyllaus = function(){
      console.log($scope.newSyllabus);

    }
  });
