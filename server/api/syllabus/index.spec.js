'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var syllabusCtrlStub = {
  index: 'syllabusCtrl.index',
  show: 'syllabusCtrl.show',
  create: 'syllabusCtrl.create',
  update: 'syllabusCtrl.update',
  destroy: 'syllabusCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var syllabusIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './syllabus.controller': syllabusCtrlStub
});

describe('Syllabus API Router:', function() {

  it('should return an express router instance', function() {
    syllabusIndex.should.equal(routerStub);
  });

  describe('GET /api/syllabuses', function() {

    it('should route to syllabus.controller.index', function() {
      routerStub.get
        .withArgs('/', 'syllabusCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/syllabuses/:id', function() {

    it('should route to syllabus.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'syllabusCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/syllabuses', function() {

    it('should route to syllabus.controller.create', function() {
      routerStub.post
        .withArgs('/', 'syllabusCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/syllabuses/:id', function() {

    it('should route to syllabus.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'syllabusCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/syllabuses/:id', function() {

    it('should route to syllabus.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'syllabusCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/syllabuses/:id', function() {

    it('should route to syllabus.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'syllabusCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
