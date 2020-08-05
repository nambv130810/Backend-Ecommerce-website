var db = require('../database/db');
const { json } = require('body-parser');
var Account = require('../models/account.model');

module.exports.login = function(req, res) {
    res.render('auth/login'); 
}

module.exports.postLogin =async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var user = await Account.find({ email: email});
    console.log(user[0]);
    if(!user[0]) {
        res.render('auth/login', {
            errors: [
                'Tên đăng nhập không tồn tại'
            ],
            values: req.body
        });
        return;
    }
    if(user[0].password !== password) {
        res.render('auth/login', {
            errors: [
                'Mật khẩu không khớp'
            ],
            values: req.body
        });
        return;
    }

    res.redirect('/users');
}