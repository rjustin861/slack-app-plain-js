const db_channel = require('../models/channel');

module.exports = function(req, res, next) {
    db_channel.find({}).then((channels) => {
        res.json(channels);
    });
}