var mongoose = require('mongoose');

var billDetailSchema = new mongoose.Schema({
    "bill_id": String,
    "product_id": String,
    "quantity": String,
    "price": String
});

var BillDetail = mongoose.model('BillDetail', billDetailSchema, 'billDetail');

module.exports = BillDetail;