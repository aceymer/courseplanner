'use strict';

var app = require('../..');
import User from '../user/user.model';
import request from 'supertest';

var newSyllabus;

describe('Syllabus API:', function() {

  var user;

  // Clear users before testing
  before(function() {
    return User.removeAsync().then(function() {
      user = new User({
        _id: '569e69cc1ab998358d37667e',
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password',
        role: ['admin']
      });

      return user.saveAsync();
    });
  });

  var token;

  before(function(done) {
    request(app)
      .post('/auth/local')
      .send({
        email: 'test@example.com',
        password: 'password'
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  // Clear users after testing
  after(function() {
    return User.removeAsync();
  });

  describe('GET /api/syllabuses', function() {
    var syllabuss;

    beforeEach(function(done) {
      request(app)
        .get('/api/syllabuses')
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          syllabuss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      syllabuss.docs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/syllabuses', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/syllabuses')
        .set('authorization', 'Bearer ' + token)
        .send({
          title: 'New Syllabus',
          lecturer: 'This is the brand new syllabus!!!',
          owner: '569e69cc1ab998358d37667e'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSyllabus = res.body;
          done();
        });
    });

    it('should respond with the newly created syllabus', function() {
      newSyllabus.title.should.equal('New Syllabus');
      newSyllabus.lecturer.should.equal('This is the brand new syllabus!!!');
    });

  });

  describe('GET /api/syllabuses/:id', function() {
    var syllabus;

    beforeEach(function(done) {
      request(app)
        .get('/api/syllabuses/' + newSyllabus._id)
        .set('authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          syllabus = res.body;
          done();
        });
    });

    afterEach(function() {
      syllabus = {};
    });

    it('should respond with the requested syllabus', function() {
      syllabus.title.should.equal('New Syllabus');
      syllabus.lecturer.should.equal('This is the brand new syllabus!!!');
    });

  });

  describe('PUT /api/syllabuses/:id', function() {
    var updatedSyllabus;

    beforeEach(function(done) {
      request(app)
        .put('/api/syllabuses/' + newSyllabus._id)
        .set('authorization', 'Bearer ' + token)
        .send({
          title: 'Updated Syllabus',
          lecturer: 'This is the updated syllabus!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSyllabus = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSyllabus = {};
    });

    it('should respond with the updated syllabus', function() {
      updatedSyllabus.title.should.equal('Updated Syllabus');
      updatedSyllabus.lecturer.should.equal('This is the updated syllabus!!!');
    });

  });

  describe('DELETE /api/syllabuses/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/syllabuses/' + newSyllabus._id)
        .set('authorization', 'Bearer ' + token)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when syllabus does not exist', function(done) {
      request(app)
        .delete('/api/syllabuses/' + newSyllabus._id)
        .set('authorization', 'Bearer ' + token)
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
