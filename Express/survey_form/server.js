const express = require("express");
const app = express();
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
   res.render('index');
})

app.post("/result", (req, res) => {
   console.log(req.body);
   data = req.body;


   res.render('result', { data: data });
})




app.listen(8000, () => console.log("listening on port 8000"));