var express = require('express');
var router = express.Router();
var controller = require('../controllers/bill.controller');

router.get('/', controller.index);

router.post('/', controller.postCreate);

module.exports = router;