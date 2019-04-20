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

username = {};
var rooms = ['Main Room', 'Only Wizards', 'Only Muggles'];

module.exports = (io) => {
  io.sockets.on('connection', (socket) => {
    console.log(socket.id);

    socket.emit('UPDATE_CHAT', 'CHATBOT', 'You have connected to the Main Room');

    socket.on('USER_CONNECTED', (data)=> {
      console.log('user connected')
      // var bot = {author: "Chat Bot", message: " you have connected"}
      // // emit to screen for self
      //has issue will broadcast
      // io.emit('UPDATE_CHAT', bot);
      socket.author = data.author
      socket.room = 'Main Room';
      // add the client's username to the global list
      usernames[username] = data.author;
      // send client to room 1
      socket.join('Main Room');
      // echo to client they've connected
      socket.emit('UPDATE_CHAT', 'SERVER', 'you have connected to the Main Room');
      // echo to room 1 that a person has connected to their room
      socket.broadcast.to('Main Room').emit('UPDATE_CHAT', 'SERVER', socket.author + ' has connected to this room');
      socket.emit('updaterooms', rooms, 'Main Room');
      //save to db
      var event = new Event({name: socket.author, room: socket.room, event:'USER_CONNECTED'});
      // event.save();
    })

    socket.on('SWITCH_ROOM', function(newroom){
      socket.leave(socket.room);
      socket.join(newroom);
      socket.emit('UPDATE_CHAT', 'Chat Bot', 'you have connected to '+ newroom)
      // sent to old room
      socket.broadcast.to(socket.room).emit('UPDATE_CHAT', 'CHAT BOT', socket.author +' has left this room');
      // SAVE TO DATABASE
      var event = new Event({name: socket.username, room: socket.room, event:`left ${socket.room}`});
      // event.save();
      // update socket session room title
      socket.room = newroom;
      socket.broadcast.to(newroom).emit('UPDATE_CHAT', 'CHAT BOT', socket.author+' has joined this room');
      socket.emit('updaterooms', rooms, newroom);
      // SAVE TO DATABASE
      var event = new Event({name: socket.author, room: socket.room, event:`joined ${socket.room}`});
      // event.save();
    })

    socket.on('SEND_MESSAGE', function(data){
        io.emit('UPDATE_CHAT', data);
        socket.author = data.author
        socket.message = data.message
        // SAVE TO DATABASE
        var chat = new Chat({ name: data.author, message: data.message});
        chat.save();
    })

    socket.on('DISCONNECT', (data) => {
      // io.sockets.emit('UPDATEUSERS')
      socket.author = data.author
      socket.room = data.room
      var bot = {author: "Chat Bot", message: socket.author + " have disconnected"}
      // socket.leave(socket.room)
      socket.broadcast.emit('UPDATE_CHAT', bot)
      // save to db
      // var event = new Event({name: socket.username, room: socket.room, event:'disconnected'});
      // event.save();
    })
});
}



