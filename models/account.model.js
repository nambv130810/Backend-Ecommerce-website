var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
    "name": String,
    "password": String
});

var Account = mongoose.model('Account', accountSchema, 'accounts');

module.exports = Account;