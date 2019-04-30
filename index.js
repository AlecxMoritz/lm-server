require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const db = require('./models/index');

app.use(bodyParser.json())
app.use(require('./middleware/headers'));

app.use('/api/auth', require('./controllers/userController'));
app.use('/api/goals', require('./controllers/goalController'));

app.listen(process.env.PORT, function() {
    console.log("Server is listening on ", process.env.PORT)
})