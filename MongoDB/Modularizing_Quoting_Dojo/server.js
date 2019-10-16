const express = require("express");
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');



app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
mongoose.connect('mongodb://localhost/testdb1', { useNewUrlParser: true });

let db = mongoose.connection;

// Check Database connection
db.once('open', function () {
    console.log("Connected to mongoDB. ");
});

// check Database errors
db.on('error', function (err) {
    console.log(err);
});

require('./server/config/routes.js')(app);



app.listen(8000, () => console.log("listening on port 8000"));