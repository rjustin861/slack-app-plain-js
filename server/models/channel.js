const db = require('../db'); // same as ../db.js

//creating the schema for channel
const db_channel = db.model('channel', {
    name: {
        type: String,
        required: true
    }
});

module.exports = db_channel;