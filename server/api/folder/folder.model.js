'use strict';

import mongoose from 'mongoose';

var FolderSchema = new mongoose.Schema({
  name: String,
  created: Date,
  folders: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Folder'
  }],
  files: [{
    name: String,
    size: Number,
    created: Date,
    url: String
  }]
});

var model = null;

FolderSchema.pre('remove', function(next) {
    this.folders.forEach(function(folder){
      model.findById(folder)
      .exec()
      .then(function(found){
        found.remove();
      });
    });
    next();

});
model = mongoose.model('Folder', FolderSchema)

export default model;
