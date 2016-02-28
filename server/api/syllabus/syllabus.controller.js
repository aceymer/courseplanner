/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/syllabuses              ->  index
 * POST    /api/syllabuses              ->  create
 * GET     /api/syllabuses/:id          ->  show
 * PUT     /api/syllabuses/:id          ->  update
 * DELETE  /api/syllabuses/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Syllabus = require('./syllabus.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.assign(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Syllabuss
export function index(req, res) {
  Syllabus.find({}).populate('owner', 'name email')
    .execAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Syllabus from the DB
export function show(req, res) {
  Syllabus.findById(req.params.id).populate('owner', 'name email')
    .execAsync()
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Syllabus in the DB
export function create(req, res) {
  Syllabus.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Syllabus in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Syllabus.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Syllabus from the DB
export function destroy(req, res) {
  Syllabus.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
