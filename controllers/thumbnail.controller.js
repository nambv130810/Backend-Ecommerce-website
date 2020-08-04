const Thumbnail = require('../models/thumbnail.model');


module.exports.index = async function(req, res) {
    var thumbnails = await Thumbnail.find();
    res.render('thumbnails/index', {
        thumbnails: thumbnails
    });
};

module.exports.create = async function(req, res) {
    res.render('products/create');
};
