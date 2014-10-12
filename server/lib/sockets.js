'use strict';

module.exports = function(server, cb){
  var io = require('socket.io')(server),
      _  = require('underscore'),
      twit = require('./twitter')(),
      clients = {};

  io.on('connection', function(socket){
    clients[socket.id] = socket;
    console.log('a user connected');
  });

  io.on('disconnect', function(socket){
    delete clients[socket.id];
  });

  twit.on('tweet', function(tweet){
    _.each(clients, function(socket){
      socket.emit('tweet', {
        text: tweet.text,
        user: tweet.user.name,
        screenName: tweet.user.screen_name
      });
    });
  });

  if(cb){cb();}
};
