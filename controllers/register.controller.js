var bcrypt = require('bcrypt');
var Account = require('../models/account.model');


module.exports.register = function(req, res) {
    res.render('auth/register');
};

module.exports.postRegister = async function(req, res) {
    try {
        var hashedPassword = await bcrypt.hash(req.body.password, 10);
        var account = new Account({
            email: req.body.email,
            password: hashedPassword
        });
        console.log(account);
        var newAccount = await account.save();
        console.log(newAccount);
        res.redirect('/login');
    }catch{
        res.redirect('/register');
    }
    
};