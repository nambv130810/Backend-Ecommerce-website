var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    "name": String,
    "imgUrl": String,
    "thumbnailUrl": [String],
    "description": String,
    "price": Number,
    "salePrice": Number,
    "quantity": Number,
    "cate_id": String
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
