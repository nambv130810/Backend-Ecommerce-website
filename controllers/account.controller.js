
var Account = require('../models/account.model');

module.exports.index = async function(req, res) {
    var accounts = await Account.find();
    
    res.render('accounts/index', {
        accounts: accounts
    });
};

module.exports.search = async function(req, res) {
    var q = req.query.q;
    var accounts = await Account.find();
    var matchedAcc = accounts.filter(function(acc) {
        return acc.email.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    
    res.render('accounts/index', {
        accounts: matchedAcc
    });
};

module.exports.create = function(req, res) {
    res.render('accounts/create')
};

module.exports.view = async function(req, res) {
    var id = req.params.id;

    var account = await Account.find({ _id: id});

    res.render('accounts/view', {
        account: account[0]
    });
};

module.exports.postCreate = async function(req, res) {
    var account = new Account({
        email: req.body.email,
        password: req.body.password
    });

    var newAccount = await account.save();
    try {
        res.redirect('/accounts');
    }catch(err) {
        res.json(err);
    }
};

module.exports.edit = async function(req, res) {
    var id = req.params.id;
    var account = await Account.find({ _id: id});
    res.render('accounts/edit', {
        account: account[0]
    });
};

module.exports.patchEdit = async function(req, res) {
    try {
        var updatedAcc = await Account.updateOne(
            { _id: req.params.id },
            { $set: {
                email: req.body.email,
                password: req.body.password
            }}
        );
        res.redirect('/accounts');
    }catch(err) {
        res.json({ message: err });
    }
};

module.exports.delete = async function(req, res) {
    var removedAccount = await Account.findByIdAndRemove({ _id: req.params.id });
    res.redirect('/accounts');
};
