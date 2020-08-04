var express = require('express');
var router = express.Router();
var controller = require('../controllers/thumbnail.controller');

// get all the thumbnails
router.get('/', controller.index);

module.exports = router;
