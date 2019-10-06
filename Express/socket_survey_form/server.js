var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get("/", (req, res) => {
    res.render('index');
})

io.on('connection', function (socket) {
    socket.on('result', function (msg) {
        var random_number = Math.floor((Math.random() * 1000) + 1);
        console.log('message: ' + msg.name);
        io.emit('result', msg);
        io.emit('random_number', { response: random_number });
    });
});
http.listen(3000, function () {
    console.log('listening on *:3000');
});