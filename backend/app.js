// dependencies
var express = require('express');
var bodyParser = require('body-parser')
var socket = require('socket.io');
var app = express();

// database 
var mongoose = require('mongoose');
var config = require("./config/db");


// socket.io
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);
// require('./socket/socket')(io);

// run on server
var server = app.listen(4000, () => {
    console.log('server is running on port', server.address().port);
    console.log('http://localhost:4000');
});

// middleware
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// database
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is now connected') },
  err => { console.log('Can not connect to the database '+ err)}
);

// models
var Chat = require('./models/chat');
var Event = require('./models/event')

// socket.io
io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
        socket.author = data.author
        socket.message = data.message
        // SAVE TO DATABASE
        var chat = new Chat({ name: data.author, message: data.message});
        chat.save();
    })
});

