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


let db = mongoose.connection;
let Cat = require('./models/cat')

// Check Database connection
db.once('open', function () {
    console.log("Connected to mongoDB. ");
});

// check Database errors
db.on('error', function (err) {
    console.log(err);
});

mongoose.connect('mongodb://localhost/testdb1', { useNewUrlParser: true });


app.get('/', (req, res) => {
    Cat.find({}).sort({ createdAt: 'desc' }).find(function (err, cats) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('index', {
                cats: cats,
            });
        }
    });
});

app.get('/cats/new', (req, res) => {
    if (!req.session.foodErr) {
        req.session.foodErr = "";
    }
    if (!req.session.nameErr) {
        req.session.nameErr = "";
    }
    res.locals.nameErr = req.session.nameErr;
    res.locals.foodErr = req.session.foodErr;
    res.render('newCat');
});

app.get('/cats/:id', (req, res) => {
    console.log(req.params.id);
    cat = Cat.findOne({ _id: req.params.id }, function (err, cat) {
        console.log(cat);
        res.render("viewCat", { cat: cat });
    });
});

app.get('/cats/edit/:id', (req, res) => {
    cat = Cat.findOne({ _id: req.params.id }, function (err, cat) {
        console.log(cat);
        res.render("editCat", { cat: cat });
    });
});

app.post('/cats', (req, res) => {
    req.session.catErr = "";
    req.session.nameErr = "";
    console.log(req.body.age);
    if (req.body.name.length < 3) {
        req.session.nameErr = "Name is too short";
        console.log(req.session.nameErr);
        res.redirect("/cats/new");
    }
    if (req.body.food.length < 5) {
        req.session.foodErr = "cat is too short";
        console.log(req.session.foodErr);
        res.redirect("/cats/new");

    }
    const cat = new Cat({
        name: req.body.name,
        food: req.body.food,
        age: parseInt(req.body.age, 10),
    });
    cat.save()
        .then(() => res.redirect('/'));
});

app.post('/catUpdate/:id', (req, res) => {
    req.session.catErr = "";
    req.session.nameErr = "";
    console.log(req.body.age);
    if (req.body.name.length < 3) {
        req.session.nameErr = "Name is too short";
        console.log(req.session.nameErr);
        res.redirect(`/cats/edit/${req.params.id}`);
    }
    if (req.body.food.length < 5) {
        req.session.foodErr = "cat is too short";
        console.log(req.session.foodErr);
        res.redirect(`/cats/edit/${req.params.id}`);

    }
    console.log("updating....");

    Cat.update(
        { _id: req.params.id },
        { name: req.body.name, food: req.body.food, age: req.body.age, },
        function (err) {
            if (err) {
                console.log("something went wrong");
                console.log(animal.errors);
                res.redirect(`/cats/edit/${req.params.id}`);
            } else {
                console.log("successfully changed a Animal!");
                res.redirect(`/cats/${req.params.id}`);
            }
        }
    );

});

app.post('/cats/destroy/:id', (req, res) => {
    console.log(`deleting: ${req.params.id}`);
    Cat.remove({ _id: req.params.id }, function (err) {
        console.log("RECORD DELETED");
        res.redirect("/");
    });
});
app.listen(8000, () => console.log("listening on port 8000"));