var express = require('express');
var router = express.Router();
var controller = require('../controllers/product.controller');

// get all the products
router.get('/', controller.index);
// search products by name
router.get('/search', controller.search);
// submit a product
router.post('/', controller.postCreate);
// specific product
router.get('/:id', controller.specific);
// delete a product
router.delete('/:id', controller.delete);
// update a product
router.patch('/:id', controller.patchUpdate)
module.exports = router;