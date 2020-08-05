module.exports.requireAuth = function(req, res, next) {
    res.locals.status = req.isAuthenticated();
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
module.exports.notRequireAuth = function(req, res, next) {
    if(req.isAuthenticated()) {
       return res.redirect('/');
    }
    next();
}