'use strict';

var express = require('express');
var controller = require('./syllabus.controller');
var auth = require('../../auth/auth.service');
var syllabusAuth = require('./syllabus.auth');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
//Owner added v0.2.19
router.delete('/:id', syllabusAuth.isOwner(), controller.destroy);



module.exports = router;




/*var restify = require('express-restify-mongoose')

restify.serve(router, Syllabus, {
  //preMiddleware: auth.isAuthenticated(),
  /*access: function (req, done) {
    if (req.user) {
      return 'private'
    } else {
      return 'public'
    }
  },
  private: ['title', 'lecturer'],
  public: ['education']
});*/
