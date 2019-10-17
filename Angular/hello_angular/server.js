const express = require("express");
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

app.use(express.static( __dirname + '/public/dist/public' ));


var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


let db = mongoose.connection;

// Check Database connection
db.once('open', function () {
    console.log("Connected to mongoDB. ");
});

// check Database errors
db.on('error', function (err) {
    console.log(err);
});

mongoose.connect('mongodb://localhost/testdb1', { useNewUrlParser: true });



require('./server/config/routes.js')(app);

app.listen(8000, () => console.log("listening on port 8000"));