const port = process.env.PORT || 3000;

const express = require('express');
const cors = require('cors');
const body_parser  = require('body-parser');

const app = express();
app.use(body_parser.json());
app.use(cors());

require('./routes')(app);

app.use(function(err, req, res, next) {
    console.log('Error', err);
    res.status(400).json({
        message: err.message
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
