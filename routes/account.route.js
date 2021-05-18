var express = require('express');
var router = express.Router();
var controller = require('../controllers/account.controller');
var validate = require('../validation/account.validate');
var authMiddleware = require('../middlewares/auth.middleware');

router.get('/',authMiddleware.requireAuth, controller.index);

// router.get('/cookie', function(req, res, next) {
//     res.cookie('user-id', 12345);
//     res.send("hello");
// });
router.get('/search', authMiddleware.requireAuth,controller.search);

router.get('/:id/edit',authMiddleware.requireAuth, controller.edit);

router.post('/:id/edit',authMiddleware.requireAuth, controller.patchEdit);

router.get('/:id/delete',authMiddleware.requireAuth, controller.delete);

router.get('/create',authMiddleware.requireAuth, controller.create);

router.get('/:id',authMiddleware.requireAuth, controller.view);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;