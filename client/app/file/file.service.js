'use strict';

angular.module('courseplannerApp')
  .factory('FolderService', function($resource) {
    return $resource('/api/folders/:controller/:id',{
        id: '@id'
      },{
        update: {
          method:'PUT'
        },
        path: {
          method:'GET',
          params: {
            controller:'path'
          },
          isArray:true
        },
        upload: {
          method:'POST',
          params: {
            controller:'upload'
          }
        },
        deleteFile: {
          method:'DELETE',
          params: {
            controller:'file'
          }
        }
      });
});
