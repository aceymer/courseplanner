'use strict';
var async = require('async');
var fs = require('fs');
var multer  = require('multer')
var uploadMulter = multer({ dest: 'uploads/' })

//Decodes a base64 encoded image and uploads it to Cloudinary
export function uploadBase64(tmpPath, base64File, cb){
  var fileBuffer = decodeBase64File(base64File);

  async.waterfall([
      //write image to tmp disk
      function writeFile(callback) {
        fs.writeFile(tmpPath, fileBuffer.data, function(err) {
          callback(err,tmpPath);
        });
      },
      //upload to cloudinary
      function upload(tmpPath, callback){
        uploadMulter.upload(tmpPath, callback);
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

function decodeBase64File (dataString){
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');
  return response;
}
