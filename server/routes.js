module.exports = function (app) {

    //channels
    app.get('/channels', require('./controllers/channels_read'));
    app.get('/channels/:id', require('./controllers/channel_read'));
    app.post('/channels', require('./controllers/channel_create'));
    app.delete('/channels/:id', require('./controllers/channel_delete'));
    app.patch('/channels/:id', require('./controllers/channel_update'));

    //messages
    app.get('/messages', require('./controllers/messages_read'));
    app.post('/messages', require('./controllers/message_create'));
    app.delete('/messages/:id', require('./controllers/message_delete'));
    app.patch('/messages/:id', require('./controllers/message_update'));

    //messages
    app.get('/users', require('./controllers/users_read'));
    app.get('/users/:id', require('./controllers/user_read'));
    app.post('/users', require('./controllers/user_create'));
    app.delete('/users/:id', require('./controllers/user_delete'));
    app.patch('/users/:id', require('./controllers/user_update'));
}