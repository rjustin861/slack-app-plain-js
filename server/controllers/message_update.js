const db_message = require('../models/message');

module.exports = function(req, res, next) {
    db_message.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((updated_message) => {
        res.json(updated_message);
    });
}