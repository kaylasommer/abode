'use strict';

var bcrypt = require('bcrypt'),
    _      = require('underscore'),
    Mongo  = require('mongodb'),
    Goal   = require('./goal'),
    House  = require('./house');

function User(o){
  this.email = o.email;
  this.name = o.name;
  this.password = bcrypt.hashSync(o.password, 10);
  this.subscriptions = [];
  this.completed = 0;
  this.avatar = '/assets/avatars/duct-tape.png';
  this.level = 'Duct Tape Engineer';
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
    var newUser = new User(o);
    User.collection.save(newUser, function(err, response){
      House.save(new House(null, newUser._id), cb);
    });
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
  var self = this;
  Goal.getCompletedCount(this._id, function(err, completed){
    self.completed = completed;

    if(completed >= 1 && completed <= 3) {
      self.avatar = '/assets/avatars/measuring-tape.png';
      self.level = 'Carpenter\'s Apprentice';
    } else if(completed >= 4 && completed <= 6) {
      self.avatar = '/assets/avatars/hammer.png';
      self.level = 'DIY Ninja';
    } else if(completed >= 7 && completed <= 9) {
      self.avatar = '/assets/avatars/paint-roller.png';
      self.level = 'Artisian';
    } else if(completed >= 10 && completed <= 12){
      self.avatar = '/assets/avatars/saw.png';
      self.level = 'Contractor';
    }
    User.collection.save(self, function(){
      cb(self);
    });
  });
};

User.prototype.subscribe = function(updatedUser, cb){
  updatedUser._id = Mongo.ObjectID(updatedUser._id);
  User.collection.save(updatedUser, function(err, response){
    cb(updatedUser);
  });
};

module.exports = User;

