'use strict';
//Owner added v0.2.19

var auth = require('../../auth/auth.service');
var Syllabus = require('./syllabus.model');
var compose = require('composable-middleware');

/**
 * Checks if the user is the owner of the syllabus
 */
 export function isOwner() {
  return compose()
    .use(auth.isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      Syllabus.findById(req.params.id).execAsync()
      .then(function(syllabus){
        console.log('syll', syllabus.owner);
        console.log('req.user._id', req.user._id);
        if (syllabus && req.user._id && req.user._id.equals(syllabus.owner)) {
          next();
        } else {
          res.status(403).send('Forbidden');
        }
      });
    });
}
