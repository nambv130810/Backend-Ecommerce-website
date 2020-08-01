module.exports.postCreate = function(req, res, next ) {
    var errors = [];
    
    if(!req.body.name) {
        errors.push('Bạn phải nhập tên tài khoản');
    }
    if(!req.body.password) {
        errors.push('Bạn phải nhập mật khẩu');
    }
    console.log(errors);
      
    if(errors.length) {
        res.render('accounts/create', {
            errors: errors,
            values: req.body
        });
        return;
    }
    
    res.locals.sendMessage =  "ok";
    
    next();
}