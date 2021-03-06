var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
users = [];
connections = [];


app.get("/", (req, res) => {
    res.render('index');
})


io.on('connection', function (socket) {
    connections.push(socket);
    console.log("Connected %s sockets connected.", connections.length);

    //Disconnect
    socket.on('disconnect', function (data) {
        users.splice(users.indexOf(socket.username), 1);
        updateUserNames();
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected, %s socketsconnectd", connections.length);
    });
    //Send Message
    socket.on('send message', function (data) {
        console.log(data);
        io.sockets.emit('new message', { msg: data, user: socket.username});
    });

    //New user
    socket.on('new user', function (data, callback) {
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUserNames();
    });

    function updateUserNames() {
        io.sockets.emit('get users', users);
    }
});
http.listen(3000, function () {
    console.log('listening on *:3000');
});