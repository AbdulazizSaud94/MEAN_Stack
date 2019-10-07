var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get("/", (req, res) => {
    res.render('index');
})

var color = "white";

io.on('connection', function (socket) {
    socket.on('green', function (msg) {
        color = "green";
        console.log('color: ' + color);
        io.emit('color', { response: color });

    });
    socket.on('blue', function (msg) {
        color = "blue";
        console.log('color: ' + color);
        io.emit('color', { response: color });

    });
    socket.on('pink', function (msg) {
        color = "pink";
        console.log('color: ' + color);
        io.emit('color', { response: color });

    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});