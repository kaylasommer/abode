'use strict';

var bcrypt = require('bcrypt'),
    _      = require('underscore'),
    Mongo  = require('mongodb'),
    Goal   = require('../models/goal');

function User(){
}

Object.defineProperty(User, 'collection', {
  get: function(){return global.mongodb.collection('users');}
});

User.findById = function(id, cb){
  var _id = Mongo.ObjectID(id),
      user;
  User.collection.findOne({_id:_id}, function(err, response){
    user = Object.create(User.prototype);
    _.extend(user, response);
    cb(err, user);
  });
};

User.register = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(user || o.password.length < 3){return cb();}
    o.password = bcrypt.hashSync(o.password, 10);
    user.setAvatar();
    User.collection.save(o, cb);
  });
};

User.login = function(o, cb){
  User.collection.findOne({email:o.email}, function(err, user){
    if(!user){return cb();}
    var isOk = bcrypt.compareSync(o.password, user.password);
    if(!isOk){return cb();}
    cb(null, user);
  });
};

User.prototype.setAvatar = function(cb){
  var user = this;
  Goal.getCompletedCount(user._id, function(err, completed){
    console.log('completed: ', completed);
    if(completed === 0){
      user.avatar = '/assets/avatars/duct-tape.png';
    } else if(completed >= 1 && completed <= 3) {
      user.avatar = '/assets/avatars/measuring-tape.png';
    } else if(completed >= 4 && completed <= 6) {
      user.avatar = '/assets/avatars/paint-roller.png';
    } else if(completed >= 7 && completed <= 9) {
      user.avatar = '/assets/avatars/hammer.png';
    } else if(completed >= 10 && completed <= 12){
      user.avatar = '/assets/avatars/saw.png';
    }
    User.collection.save(user, function(err, response){
      cb(user);
    });
  });
};

module.exports = User;

