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
let Quote = require('./models/quote')

// Check Database connection
db.once('open', function () {
    console.log("Connected to mongoDB. ");
});

// check Database errors
db.on('error', function (err) {
    console.log(err);
});



app.get('/', (req, res) => {
    if (!req.session.quoteErr) {
        req.session.quoteErr = "";
    }
    if (!req.session.nameErr) {
        req.session.nameErr = "";
    }
    res.locals.nameErr = req.session.nameErr;
    res.locals.quoteErr = req.session.quoteErr;
    res.render('index');
});

app.get('/quotes', (req, res) => {
    Quote.find({}).sort({ createdAt: 'desc' }).find(function (err, quotes) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('quote', {
                quotes: quotes,
            });
        }
    });
});

app.post('/quotes', (req, res) => {
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