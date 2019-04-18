const db_channel = require('../models/channel');

module.exports = function(req, res, next) {
    db_channel.findOneAndUpdate( {"_id": req.params.id} , req.body , {"new": true} ).then(updated_channel => {
        res.json(updated_channel);
    });
}