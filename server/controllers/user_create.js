const db_user = require('../models/user');

module.exports = function(req, res, next) {
    db_user.create(req.body).then(function(new_user) {
        res.status(201).json(new_user);
    });
}