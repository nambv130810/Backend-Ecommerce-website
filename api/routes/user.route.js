var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');

router.get('/', controller.index);

router.post('/', controller.postCreate);

module.exports = router;