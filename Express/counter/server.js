const express = require("express");
const app = express();
const session = require('express-session');

app.use(express.static(__dirname + "/static"));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))


app.get('/', (req, res) => {

    if (req.session.count) {
        req.session.count += 1;
    }
    else {
        req.session.count = 1;

    }
    res.locals.count = req.session.count;
    // var count = res.session.count;
    // console.log(res.session.count) ;

    res.render('index');
});

app.post('/add_two', (req, res) => {
    req.session.count += 1;
    res.redirect('/');
});

app.post('/reset', (req, res) => {
    req.session.count = 0;
    res.redirect('/');
});

app.listen(8000, () => console.log("listening on port 8000"));