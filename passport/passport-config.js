var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');


function initialize(passport, getUserByEmail, getUserById) {
    var authenticateUser = async function(email, password, done) {
        var user = await getUserByEmail(email);
        if(user == null) {
            return done(null, false, { message: 'Không có email này'})
        }
        try {
            if(await bcrypt.compare(password, user.password).then()) {
                return done(null, user);
            }
            else {
                return done(null, false, {message: 'Mật khẩu không đúng'});
            }
        }catch(e) {
            return done(e);
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser(function(user, done) {
        return done(null, user._id);
    });
    passport.deserializeUser(function(id, done) {
        return done(null, getUserById(id));
    });
}

module.exports.initial = initialize