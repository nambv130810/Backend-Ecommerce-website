const Thumnail = require('../../models/thumbnail.model');
const Thumbnail = require('../../models/thumbnail.model');

module.exports.index = async function(req, res) {
    var thumbnails = await Thumbnail.find();
    res.json(thumbnails);
};
