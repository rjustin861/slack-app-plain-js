const db_user = require('../models/user');

module.exports = function(req, res, next) {
    db_user
        .find({})
        .select({
            createdDate: 0
        })
        .then(function(users) {
            res.status(200).json(users);
        });
}