const passport = require("passport");


module.exports.login = function(req, res) {
    res.render('auth/login');
};
module.exports.postLogin = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
})