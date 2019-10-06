var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get("/", (req, res) => {
    count = 0;
    res.render('index');
})

var count = 0;

io.on('connection', function (socket) {
    socket.on('add', function (msg) {
        console.log('message: ' + count);
        count += 1;
        io.emit('number', { response: count });

    });
    socket.on('reset', function (msg) {
        console.log('message: ' + count);
        count = 0;
        io.emit('number', { response: count });

    });
});
http.listen(3000, function () {
    console.log('listening on *:3000');
});