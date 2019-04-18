const db_user = require('../models/user');

module.exports = function (req, res, next) {
    db_user.findByIdAndRemove(req.params.id).then((deleted_user) => {
        res.json(deleted_user);
    });
}
