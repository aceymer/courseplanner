//cloudinaryHelper.js
var cloudinary = require('cloudinary');
var config = require('../../config/environment');

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret
});

export function upload(imgPath, callback){
  cloudinary.uploader.upload(imgPath, function(result) {
    if(result){
      callback(null, result);
    }
    else {
      callback('Error uploading to cloudinary');
    }
  });
}
