// THIS FILE IS USED FOR ACCESSING THE DATABASE WITH ITS ROUTES

var express = require('express');
var router = express.Router();

// Database Models
var Chat = require('../models/chat');
var Event = require('../models/event');

// get all chat history
router.get('/api/history', (req, res) => {
    Chat.getChat(function (err, chats){
        if(err){
            throw err;
        }
        res.json(chats);
    });
});
// router.get('/api/history', function(req, res, next) {
//     Chat.find((err, results)=>{
//       if(err) throw err;
//       res.header("Content-Type",'application/json');
//       res.send(JSON.stringify(results, null, 4));
//     });
//   }); 

// get chat history by room
router.post('/api/roomhistory', (req, res) => {
    var roomname = req.query.roomname;
    Chat.getChatByRoom(roomname, (err, chats) => {
        if(err){
            throw err;
        }
        res.json(chats);
    });
})

// get all eventlogs
router.get('/api/eventlog', (req, res) => {
    Event.find((err, results)=>{
        if(err) throw err;
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(results, null, 4));

    }); 
})

module.exports = router;
