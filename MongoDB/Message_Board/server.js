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
const flash = require('express-flash');
app.use(flash());

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

let Quote = require('./models/message');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('add_message', (req, res) => {
    req.session.quoteErr = "";
    req.session.nameErr = "";
    console.log(req.body);
    if (req.body.name.length < 3) {
        req.session.nameErr = "Name is too short";
        console.log(req.session.nameErr);
        res.redirect("/");
    }
    if (req.body.quote.length < 5) {
        req.session.quoteErr = "Quote is too short";
        console.log(req.session.quoteErr);
        res.redirect("/");

    }
    const quote = new Quote(req.body);
    quote.save()
        .then(() => res.redirect('/quotes'));
});

app.listen(8000, () => console.log("listening on port 8000"));