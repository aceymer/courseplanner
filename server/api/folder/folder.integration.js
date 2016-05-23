'use strict';

var app = require('../..');
import request from 'supertest';

var newFolder;

describe('Folder API:', function() {

  describe('GET /api/folders', function() {
    var folders;

    beforeEach(function(done) {
      request(app)
        .get('/api/folders')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          folders = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      folders.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/folders', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/folders')
        .send({
          name: 'New Folder',
          info: 'This is the brand new folder!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFolder = res.body;
          done();
        });
    });

    it('should respond with the newly created folder', function() {
      newFolder.name.should.equal('New Folder');
      newFolder.info.should.equal('This is the brand new folder!!!');
    });

  });

  describe('GET /api/folders/:id', function() {
    var folder;

    beforeEach(function(done) {
      request(app)
        .get('/api/folders/' + newFolder._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          folder = res.body;
          done();
        });
    });

    afterEach(function() {
      folder = {};
    });

    it('should respond with the requested folder', function() {
      folder.name.should.equal('New Folder');
      folder.info.should.equal('This is the brand new folder!!!');
    });

  });

  describe('PUT /api/folders/:id', function() {
    var updatedFolder;

    beforeEach(function(done) {
      request(app)
        .put('/api/folders/' + newFolder._id)
        .send({
          name: 'Updated Folder',
          info: 'This is the updated folder!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFolder = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFolder = {};
    });

    it('should respond with the updated folder', function() {
      updatedFolder.name.should.equal('Updated Folder');
      updatedFolder.info.should.equal('This is the updated folder!!!');
    });

  });

  describe('DELETE /api/folders/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/folders/' + newFolder._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when folder does not exist', function(done) {
      request(app)
        .delete('/api/folders/' + newFolder._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
