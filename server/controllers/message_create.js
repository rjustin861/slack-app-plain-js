const db_message = require('../models/message');

module.exports = function (req, res, next) {    
    db_message.create(req.body)
        .then((message) => {
            db_message
                .findById(message._id)
                .populate({
                    path: 'user',
                    select: 'name'
                }).then((new_message) => {
                    res.status(201).json(new_message);
                })
        });
};