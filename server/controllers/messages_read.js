const db_message = require('../models/message');

module.exports = function(req, res, next) {    
    let query = {};

    if(req.query.channel) {
        query = {'channelId': req.query.channel};
    }

    db_message
        .find(query)
        // .select({ //to select which field I want, which field I don't want. If we don't do this, we can do it in model level
        //     body: 1, //1 we want, 0 we don't want
        //     author: 1,
        //     channelId: 1

        // })
        // .populate({
        //     path: 'channelId', //which field we want to populate to
        //     select: 'name' //what do we want to get
        // })
        .populate({
            path: 'user',
            select: 'name'
        })
        .then((messages) => {           
            res.status(200).json(messages);
    });
};