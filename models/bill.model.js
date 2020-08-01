var mongoose = require('mongoose');

var billSchema = new mongoose.Schema({
    "date": Date,
    "user_id": String,
    "bill_id": String
});

var Bill = mongoose.model('Bill', billSchema, 'bills');

module.exports = Bill;