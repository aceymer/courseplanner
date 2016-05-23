'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var folderCtrlStub = {
  index: 'folderCtrl.index',
  show: 'folderCtrl.show',
  create: 'folderCtrl.create',
  update: 'folderCtrl.update',
  destroy: 'folderCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var folderIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './folder.controller': folderCtrlStub
});

describe('Folder API Router:', function() {

  it('should return an express router instance', function() {
    folderIndex.should.equal(routerStub);
  });

  describe('GET /api/folders', function() {

    it('should route to folder.controller.index', function() {
      routerStub.get
        .withArgs('/', 'folderCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/folders/:id', function() {

    it('should route to folder.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'folderCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/folders', function() {

    it('should route to folder.controller.create', function() {
      routerStub.post
        .withArgs('/', 'folderCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/folders/:id', function() {

    it('should route to folder.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'folderCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/folders/:id', function() {

    it('should route to folder.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'folderCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/folders/:id', function() {

    it('should route to folder.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'folderCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
