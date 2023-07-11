require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/index');

// Parse incoming JSON requests
app.use(bodyParser.json());

// Parse incoming urlencoded requests
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', router);

const port = process.env.SERVER_PORT || 4000;
app.listen(port, () => {
    console.log('Server is running on port ', port);
});