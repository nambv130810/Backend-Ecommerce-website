var express = require('express');
var router = express.Router();
var controller = require('../controllers/thumbnail.controller');


router.get('/', controller.index);

router.get('/create', controller.create);

// router.get('/:id/delete', controller.delete);

// router.post('/create', controller.postCreate);

module.exports = router;