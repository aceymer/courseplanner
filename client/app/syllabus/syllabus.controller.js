'use strict';

angular.module('courseplannerApp')
  .controller('SyllabusCtrl', function($scope, $state, $mdToast, SyllabusService, socket, Auth, syllabuses) {
    $scope.isAuthenticated = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.propToSortOn = 'title';
    $scope.reverse = false;
    $scope.search = {};
    $scope.newSyllabus = {};
    $scope.totalSyllabuses = 0;
    $scope.syllabusesPerPage = 25; // this should match however many results your API puts on one page

    function initialSetup(syllabuses){
      $scope.totalSyllabuses = syllabuses.total;
      $scope.syllabuses = syllabuses.docs;
      $scope.currenPage = 1;
      //socket.syncUpdates('syllabus', $scope.syllabuses);
    }


    function getResultsPage(pageNumber) {
      if(!$scope.syllabuses){ return;}
      SyllabusService.paged(
        { page: pageNumber,
          limit: $scope.syllabusesPerPage,
          sortBy: $scope.propToSortOn,
          search: $scope.search.value },
        function(syllabuses) {
          $scope.totalSyllabuses = syllabuses.total;
          $scope.syllabuses = syllabuses.docs;
          $scope.currenPage = pageNumber;
      });
    }

    $scope.$watch('search', function() {
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
      $scope.newSyllabus.owner =  Auth.getCurrentUser()._id;

      SyllabusService.save($scope.newSyllabus, function() {
        $scope.newSyllabus = {};
        getResultsPage($scope.currenPage);
      });
    };

    $scope.deleteSyllabus = function(syllabus) {
      SyllabusService.delete({
        id: syllabus._id
      }, function() {
        _.remove($scope.syllabuses, function(syl) {
          return syl._id === syllabus._id;
        });
        SyllabusService.paged(
          { page: $scope.currenPage,
            limit: $scope.syllabusesPerPage,
            sortBy: $scope.propToSortOn,
            search: $scope.search.value },
          function(syllabuses) {
            $scope.totalSyllabuses = syllabuses.total;
            var toast = $mdToast.simple()
              .textContent('Syllabus Deleted')
              .action('OK')
              .highlightAction(true)
              .position('left');
            $mdToast.show(toast);

            $scope.currenPage = $scope.currenPage;
        });

      });
    };

    $scope.goToSyllabus = function(syllabus) {

      $state.go('week', {
        id: syllabus._id
      });
    };

    $scope.$on('$destroy', function() {
      //socket.unsyncUpdates('syllabus');
    });

    initialSetup(syllabuses);

  });
