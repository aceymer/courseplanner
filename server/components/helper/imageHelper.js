'use strict';
var async = require('async');
var fs = require('fs');
var cloudinaryHelper = require('./cloudinaryHelper');

//Decodes a base64 encoded image and uploads it to Cloudinary
export function uploadBase64Image(tmpPath, base64Image, cb){
  var imageBuffer = decodeBase64Image(base64Image);

  async.waterfall([
      //write image to tmp disk
      function writeImage(callback) {
        fs.writeFile(tmpPath, imageBuffer.data, function(err) {
          callback(err,tmpPath);
        });
      },
      //upload to cloudinary
      function upload(tmpPath, callback){
        cloudinaryHelper.upload(tmpPath, callback);
      },
      function removeFile(result, callback){
        fs.unlink(tmpPath, function(err) {
          callback(err, result);
        });
      }
    ], function(err, result){
      if(err) console.error(err);
      cb(err,result);
    }
  );
}

function decodeBase64Image (dataString){
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');
  return response;
}
