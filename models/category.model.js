var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    "name": String,
    "cate_id": String
});

var Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = Category;