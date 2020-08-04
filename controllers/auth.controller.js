var db = require('../database/db');
const { json } = require('body-parser');


module.exports.login = function(req, res) {
    res.render('auth/login'); 
}

module.exports.postLogin = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    var user = db.get('users').find({ email: email }).value();
    if(!user) {
        res.render('auth/login', {
            errors: [
                'Tên đăng nhập không tồn tại'
            ],
            values: req.body
        });
        return;
    }
    if(user.password !== password) {
        res.render('auth/login', {
            errors: [
                'Mật khẩu không khớp'
            ],
            values: req.body
        });
        return;
    }

    res.redirect('/accounts');
}