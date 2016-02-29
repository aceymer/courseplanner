'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    Schema = mongoose.Schema;

var SyllabusSchema = new mongoose.Schema({
  academy: String,
  year: Number,
  title: String,
  education: String,
  lecturer: String,
  owner: {
    type: Schema.ObjectId, 
    ref: 'User'
  },
  objectives: String,
  iconurl: String,
  weekplans: [{
    week: Number,
    summary: String,
    topics: String,
    literature: String,
    videos: String,
    assignments: String,
    teaser: String
  }]
});


export default mongoose.model('Syllabus', SyllabusSchema);
