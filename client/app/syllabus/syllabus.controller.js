'use strict';

angular.module('courseplannerApp')
  .controller('SyllabusCtrl', function($scope, $state, SyllabusService, socket, Auth) {
    $scope.isAuthenticated = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.propToSortOn = 'title';
    $scope.reverse = false;
    $scope.search = {};
    $scope.newSyllabus = {};
    $scope.totalSyllabuses = 0;
    $scope.syllabusesPerPage = 25; // this should match however many results your API puts on one page

    function getResultsPage(pageNumber) {

      SyllabusService.paged(
        { page: pageNumber,
          limit: $scope.syllabusesPerPage,
          sortBy: $scope.propToSortOn,
          search: $scope.search.value },
        function(syllabuses) {
          $scope.totalSyllabuses = syllabuses.total;
          $scope.syllabuses = syllabuses.docs;
          $scope.currenPage = pageNumber;
          socket.syncUpdates('syllabus', $scope.syllabuses);
      });
    }

    $scope.$watch('search', function() {
      console.log('changed!!');
      getResultsPage(1);
    }, true);

    $scope.sort = function(keyname){
       $scope.propToSortOn = keyname;
       $scope.reverse = !$scope.reverse;
       if($scope.reverse){
          $scope.propToSortOn = '-' + $scope.propToSortOn;
       }
       getResultsPage($scope.currenPage);
     };

    $scope.isOwner = function(syllabus){
      if(syllabus.owner){
        return Auth.getCurrentUser()._id === syllabus.owner._id;
      }
    };


    $scope.pagination = {
        current: 1
    };

    $scope.pageChanged = function(newPage) {
        getResultsPage(newPage);
    };

    $scope.createSyllaus = function() {

      //Owner added v0.2.19
      //$scope.newSyllabus.owner =  Auth.getCurrentUser();

      SyllabusService.save($scope.newSyllabus, function() {
        $scope.newSyllabus = {};
      });
    };

    $scope.deleteSyllabus = function(syllabus) {
      SyllabusService.delete({
        id: syllabus._id
      }, function(syllabus) {
        console.log('Syllabus deleted', syllabus);
      });
    };

    $scope.goToSyllabus = function(syllabus) {

      $state.go('week', {
        id: syllabus._id
      });
    };

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('syllabus');
    });

    getResultsPage(1);


  });
