const db_user = require('../models/message');

module.exports = function(req, res, next) {
    console.log(req.params.id);
    
    db_user.findOneAndUpdate({_id: req.params.id}, req.body, { new: true }).then((updated_user) => {
        console.log(updated_user);
        console.log(req.body);
        
        
        res.json(updated_user);
    });
}