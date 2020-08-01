var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    "name": String,
    "imgUrl": String,
    "description": String,
    "price": String,
    "quantity": Number,
    "cate_id": String
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
