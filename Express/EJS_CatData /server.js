const express = require("express");
const app = express();
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (request, response) => {
    response.send("Hello Express");
});
app.get("/cats", (req, res) => {
    res.render('cats');
})

app.get("/Garfield", (req, res) => {
    // hard-coded user data
    var cat_array =
        { name: "Garfield", food: "Lasagna", age: "41", sleepSpots: ['Bed', 'Couch', 'Car'] };
    res.render('details', { cat: cat_array });
})

app.get("/Tom", (req, res) => {
    // hard-coded user data
    var cat_array =
        { name: "Tom", food: "Jerry", age: "79", sleepSpots: ['Floor', 'Couch', 'Kitchen'] };
    res.render('details', { cat: cat_array });
})

app.get("/Sylvester", (req, res) => {
    // hard-coded user data
    var cat_array =
        { name: "Sylvester", food: "Tweety", age: "64", sleepSpots: ['Cage', 'Bath Tub', 'Yard']};
    res.render('details', { cat: cat_array });
})

app.get("/Boots", (req, res) => {
    // hard-coded user data
    var cat_array =
        { name: "Boots", food: "Caviar & Champagne", age: "15", sleepSpots: ['Catsle', 'Horseback', 'Tent']};
    res.render('details', { cat: cat_array });
})

app.listen(8000, () => console.log("listening on port 8000"));