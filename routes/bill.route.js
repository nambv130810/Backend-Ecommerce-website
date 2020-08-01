var express = require('express');
var router = express.Router();
var controller = require('../controllers/bill.controller');

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/:id/edit', controller.edit);

router.post('/:id/edit', controller.patchEdit);

router.get('/create', controller.create);

router.get('/:id', controller.view);

router.post('/create', controller.postCreate);

module.exports = router;