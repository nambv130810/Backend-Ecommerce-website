var mongoose = require('mongoose');

var userScheme = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    address: String,
    phone: String,
    userId: String
});

var User = mongoose.model('User', userScheme, 'users');

module.exports = User;

