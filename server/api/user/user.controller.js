'use strict';

import _ from 'lodash';
import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
var imageHelper = require('../../components/helper/imageHelper');
var request = require('request');

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
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

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function respondWith(res, statusCode) {
  statusCode = statusCode || 200;
  return function() {
    res.status(statusCode).end();
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  User.findAsync({}, '-salt -password -photo')
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

// Updates an existing user in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  User.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWith(res))
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.saveAsync()
    .spread(function(user) {
      var token = jwt.sign({
        _id: user._id
      }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({
        token
      });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  User.findByIdAsync(userId, '-salt -password -photo')
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  User.findByIdAndRemoveAsync(req.params.id)
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findByIdAsync(userId)
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.saveAsync()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  User.findOne({
      _id: userId
    }, '-salt -password')
    .deepPopulate('rootFolder rootFolder.folders')
    .execAsync()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }

      if (user.photo) {
        request({url: user.photo, encoding: null}, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            var prefix = 'data:' + response.headers['content-type'] + ';base64,';
            var image = body.toString('base64');
            user.photo = prefix + image;
            res.json(user);
          }
        });
      } else {
        res.json(user);
      }
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}

/**
 * Updates user profile photo
 */
export function updateProfilePhoto(req, res) {
  var userId = req.params.id;

  User.findById(userId, function(err, user) {
    if (user && req.body.photo) {
      imageHelper.uploadBase64Image('./.tmp/' + userId + '_profile.jpg', req.body.photo, function(err, result) {
        if (err) res.send(400, err);
        else {
          user.photo = String(result.url);
          user.save(function(err) {
            if (err) return validationError(res, err);
            res.send(200);
          });
        }
      });
    } else {
      res.send(400);
    }
  });
}
