const db_channel = require('../models/channel');

module.exports = function(req, res, next) {
    db_channel.deleteOne({"_id": req.params.id}).then((deleted_channel) => {
        res.json(deleted_channel);
    });
}