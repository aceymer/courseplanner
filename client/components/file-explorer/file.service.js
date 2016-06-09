'use strict';

angular.module('courseplannerApp')
  .factory('FileService', function Formulator() {
    var Formulator = {
      readFile: function(file, cb){
        console.log('huh');
        if(window.FileReader){
          if(file.size > 500000000){
            return cb('Error, file exceeds max size limit.');
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
