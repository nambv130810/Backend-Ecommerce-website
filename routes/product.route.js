var express = require('express');
var router = express.Router();
var controller = require('../controllers/product.controller');
var authMiddleware = require('../middlewares/auth.middleware');
//const { route } = require('../api/routes/product.route');
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

var upload = multer({storage: storage });
var cpUpload = upload.fields([{ name: 'imgUrl', maxCount: 1 }, { name: 'thumbnailUrl', maxCount: 8 }]);

router.get('/',authMiddleware.requireAuth, controller.index);

router.get('/search', authMiddleware.requireAuth,controller.search);

router.get('/:id/edit', authMiddleware.requireAuth,controller.edit);

router.post('/:id/edit', cpUpload, controller.patchEdit);

router.get('/:id/delete',authMiddleware.requireAuth,controller.delete);

router.get('/create', controller.create);

router.get('/:id', authMiddleware.requireAuth,controller.view);

router.post('/create', cpUpload, controller.postCreate);

module.exports = router;