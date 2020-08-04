var mongoose = require('mongoose');

var thumbnailSchema = new mongoose.Schema({
    "thumbnailUrl": String,
    "product_id": String
});

var Thumbnail = mongoose.model('Thumbnail', thumbnailSchema, 'thumnails');

module.exports = Thumbnail;