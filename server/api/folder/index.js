'use strict';

var express = require('express');
var controller = require('./folder.controller');

var router = express.Router();

router.get('/path/:id', controller.path);
router.get('/:id', controller.show);
router.post('/:parentId', controller.create);
router.post('/upload/:parentId', controller.upload);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:folderId/:fileId', controller.destroyFile);
router.delete('/:id', controller.destroy);

module.exports = router;
