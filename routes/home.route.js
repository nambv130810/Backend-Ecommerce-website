
var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');
var authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.requireAuth, controller.index);

module.exports = router;