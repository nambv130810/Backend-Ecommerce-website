var express = require('express');
var router = express.Router();
var controller = require('../controllers/product.controller');
var authMiddleware = require('../middlewares/auth.middleware');
//const { route } = require('../api/routes/product.route');

router.get('/', authMiddleware.requireAuth,controller.index);

router.get('/search', authMiddleware.requireAuth,controller.search);

router.get('/:id/edit', authMiddleware.requireAuth,controller.edit);

router.post('/:id/edit', authMiddleware.requireAuth,controller.patchEdit);

router.get('/:id/delete',authMiddleware.requireAuth,controller.delete);

router.get('/create',authMiddleware.requireAuth, controller.create);

router.get('/:id', authMiddleware.requireAuth,controller.view);

router.post('/create',authMiddleware.requireAuth, controller.postCreate);

module.exports = router;