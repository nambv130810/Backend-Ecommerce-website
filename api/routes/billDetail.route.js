var express = require('express');
var router = express.Router();
var controller = require('../controllers/billDetail.controller');

router.get('/', controller.index);

router.post('/', controller.postCreate);

module.exports = router;