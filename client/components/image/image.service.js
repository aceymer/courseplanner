'use strict';

angular.module('courseplannerApp')
  .factory('ImageService', function Formulator() {
    var Formulator = {
      readImageFile: function(file, cb){
        if(window.FileReader){
          if(file.size > 4000000){
            return cb('Error, photo exceeds max size limit.');
          }
          if(!file.type.match('image.*')){
           return cb('Error, file must be a photo.');
          }

          var reader = new FileReader();
          reader.onloadend = function (event) {
            if(event.target.error !== null){
              return cb('Error, please try another photo.');
            }
            else {
              return cb(null,reader.result);
            }
          };
          reader.readAsDataURL(file);
        }
        else {
          return cb('Sorry, this browser doesn\'t support photo uploads.');
        }
      }
    };
    return Formulator;
  });
