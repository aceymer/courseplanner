'use strict';

import mongoose from 'mongoose';

var FolderSchema = new mongoose.Schema({
  name: String,
  created: {
    type: Date,
    default: new Date()
  },
  folders: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Folder'
  }],
  files: [{
    name: String,
    size: Number,
    created: {
      type: Date,
      default: new Date()
    },
    url: String,
    isFile: Boolean
  }]
});

var model = null;

FolderSchema.pre('remove', function(next) {
    this.folders.forEach(function(folder){
      model.findById(folder)
      .exec()
      .then(function(found){
        if(found){
          found.remove();
        }
      });
    });
    next();

});
model = mongoose.model('Folder', FolderSchema)

export default model;
