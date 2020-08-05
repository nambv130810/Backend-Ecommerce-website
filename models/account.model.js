var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
    "email": String,
    "password": String
});

var Account = mongoose.model('Account', accountSchema, 'accounts');

module.exports = Account;