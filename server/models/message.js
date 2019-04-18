const db = require('../db');

const db_message = db.model('message', {
    __v: {
        type: Number,
        select: false // we do not want to return __v to the user. This method is useful for password or making the API light weight
    },
    body: {
        type: String,
        required: true
    },
    likes: {
        type: Number
    }, 
    channelId: {
        type: db.Schema.Types.ObjectId,
        ref: 'channel', // tell that this channelId comes from another collection called channel. We define the ref, so we can use populate method
        required: [true, 'Channel is required'] // the message 'Channel is required' will be displayed if the user does not put channel
    },
    user: {
        type: db.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'User is required']
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = db_message;