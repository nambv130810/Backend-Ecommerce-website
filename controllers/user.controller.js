var User = require('../models/user.model');

module.exports.index = async function(req, res ) {
    var users = await User.find();
    var page = parseInt(req.query.page) || 1;
    var limit = 5;
    var start = (page-1) * limit;
    var end = page * limit;
    var pages  = Math.ceil(users.length/5); 
    res.render('users/index', {
        users: users.slice(start, end),
        pages: pages+1
    })
};
module.exports.search = async function(req, res) {
    var q = req.query.q;
    var users = await User.find();
    var matchedUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    
    res.render('users/index', {
        users: matchedUsers
    });
};


module.exports.edit = async function(req, res) {
    var id = req.params.id;
    var user = await User.find({ _id: id});
    res.render('users/edit', {
        user: user[0]
    });
};

module.exports.patchEdit = async function(req, res) {
    try {
        var updateUser = await User.updateOne(
            { _id: req.params.id },
            { $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                address: req.body.address,
                phone: req.body.phone
            }}
        );
        res.redirect('/users');
    }catch(err) {
        res.json({ message: err });
    }
};

module.exports.delete = async function(req, res) {
    var removedUser = await User.findByIdAndRemove({ _id: req.params.id });
    res.redirect('/users');
};

module.exports.create = function(req, res) {
    res.render('users/create')
};

module.exports.postCreate = async function(req, res) {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone
    });

    var newUser = await user.save();
    try {
        res.redirect('/users');
    }catch(err) {
        res.json(err);
    }
};

module.exports.view = async function(req, res) {
    var id = req.params.id;

    var user = await User.find({ _id: id});

    res.render('users/view', {
        user: user[0]
    });
};
