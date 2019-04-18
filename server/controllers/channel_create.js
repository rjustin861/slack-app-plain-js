const db_channel = require('../models/channel');

module.exports = function(req, res, next) {
    db_channel.create(req.body).then((channel) => {
        res.json(channel);
    });
}