var User = require('../../models/user.model');

module.exports.index =  async function(req, res) {
    try {
        var users = await User.find();
        res.json(users);
    }catch(err) {
        res.json({ message: err });
    }
};

module.exports.postCreate = async function(req, res) {
    var user = new User(
        {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            userId: req.body.userId
        }
    );
    try {
        var savedUser = await user.save();
        res.json(savedUser);
    }catch(err) {
        res.json({ message: err });
    }
    
};
