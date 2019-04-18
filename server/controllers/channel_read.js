const db_channel = require('../models/channel');

module.exports = function(req, res, next) {
    db_channel.findOne({"_id": req.params.id}).then(channel => {
        res.json(channel);
    });
}