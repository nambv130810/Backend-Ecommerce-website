var express = require('express');
var controller = require('../controllers/login.controller');
var router = express.Router();
var authMiddleware = require('../middlewares/auth.middleware');

router.get('/',authMiddleware.notRequireAuth, controller.login);
router.post('/', authMiddleware.notRequireAuth,controller.postLogin);

module.exports = router;