const express = require("express");
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const emailRegex = require('email-regex');
const bcrypt = require('bcrypt');

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


let User = require('./models/user')

app.get('/', (req, res) => {
    if (!req.session.emailErr) {
        req.session.emailErr = "";
    }
    if (!req.session.fnameErr) {
        req.session.fnameErr = "";
    }
    if (!req.session.lnameErr) {
        req.session.lnameErr = "";
    }
    if (!req.session.passErr) {
        req.session.passErr = "";
    }
    res.locals.emailErr = req.session.emailErr;
    res.locals.fnameErr = req.session.fnameErr;
    res.locals.lnameErr = req.session.lnameErr;
    res.locals.passErr = req.session.passErr;
    res.render("index");
});

app.post('/register', (req, res) => {
    req.session.emailErr = "";
    req.session.fnameErr = "";
    req.session.lnameErr = "";
    req.session.passErr = "";
    // Check for valid email
    var validEmail = emailRegex({ exact: true }).test(req.body.reg_email);
    if (!validEmail) {
        req.session.emailErr = "invalid email";
        console.log(req.session.emailErr);
    }

    if (req.body.reg_first_name.length < 3) {
        req.session.fnameErr = "invlid first name";
        console.log(req.session.fnameErr);
    }

    if (req.body.reg_last_name.length < 3) {
        req.session.lnameErr = "invlid last name";
        console.log(req.session.lnameErr);
    }

    if (req.body.reg_pass != req.body.reg_conf_pass) {
        console.log(req.body.reg_pass);
        console.log(req.body.reg_conf_pass);
        req.session.passErr = "Passwords are not matching";
        console.log(req.session.passErr);
    }

    if (req.body.reg_pass.length < 8) {
        console.log(req.body.reg_pass.length);
        req.session.passErr = "password is too short";
        console.log(req.session.passErr);
    }

    if (req.session.emailErr || req.session.fnameErr || req.session.lnameErr || req.session.passErr) {
        res.redirect('/');
    }
    else {
        bcrypt.hash('password_from_form', 10)
            .then(hashed_password => {
                const user = new User({
                    first_name: req.body.reg_first_name,
                    last_name: req.body.reg_lirst_name,
                    email: req.body.reg_email,
                    password: hashed_password,
                    birthday: req.body.reg_birthday,
                });
                user.save()
                    .then(() => res.redirect('/home'));
            })
            .catch(error => {
                console.log(error);
                res.redirect('/');

            });
    }
});

app.get('/home', (req, res) => {
    res.render("home");
});

app.listen(8000, () => console.log("listening on port 8000"));