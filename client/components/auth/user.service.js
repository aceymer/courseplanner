'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller:'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id:'me'
      }
    },
    update: {
      method:'PUT'
    },
    updateProfilePhoto: {
      method: 'PUT',
      params: {
        controller: 'profilePhoto'
      }
    }
  });
}

angular.module('courseplannerApp.auth')
  .factory('User', UserResource);

})();
