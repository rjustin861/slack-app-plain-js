const db = require('../db');

const db_user = db.model('user', {
    __v: {
        type: Number,
        select: false
    }, 
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Online'
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = db_user;