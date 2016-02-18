'use strict';

angular.module('courseplannerApp')
  .factory('SyllabusService', function($resource) {
    return $resource('/api/syllabuses/:id',{
        id: '@id'
      },{
        update: {
          method:'PUT'
        }
      });
});
