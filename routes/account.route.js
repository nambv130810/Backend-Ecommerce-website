var express = require('express');
var router = express.Router();
var controller = require('../controllers/account.controller');
var validate = require('../validation/account.validate');


router.get('/', controller.index);

router.get('/cookie', function(req, res, next) {
    res.cookie('user-id', 12345);
    res.send("hello");
});
router.get('/search', controller.search);

router.get('/:id/edit', controller.edit);

router.post('/:id/edit', controller.patchEdit);

router.get('/:id/delete', controller.delete);

router.get('/create', controller.create);

router.get('/:id', controller.view);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;