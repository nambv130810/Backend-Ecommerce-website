var express = require('express');
var controller = require('../controllers/register.controller');
var router = express.Router();

router.get('/', controller.register);
router.post('/', controller.postRegister);

module.exports = router;