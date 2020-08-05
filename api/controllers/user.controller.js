var User = require('../../models/user.model');
var Joi = require('@hapi/joi');
const { json } = require('body-parser');


var schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(6).required(),
    address: Joi.string().min(6).required(),
    phone: Joi.string().min(6).required(),
    user_id: Joi.string()
};


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
module.exports.postRegister = async function(req, res) {
     // validate the user's information
     var {error} = Joi.validate(req.body, schema);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
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