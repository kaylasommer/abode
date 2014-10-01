'use strict';

var bcrypt = require('bcrypt'),
    _      = require('underscore'),
    Mongo  = require('mongodb');

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
    o.completedGoals = 0;
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

User.prototype.setAvatar = function(){
  console.log(this);
  this.completedGoals = this.completedGoals + 1;
  if(this.completedGoals === 0){
    this.avatar = '/assets/avatars/duct-tape.png';
  } else if(this.completedGoals >= 1 && this.completedGoals <= 3) {
    this.avatar = '/assets/avatars/measuring-tape.png';
  } else if(this.completedGoals >= 4 && this.completedGoals <= 6) {
    this.avatar = '/assets/avatars/paint-roller.png';
  } else if(this.completedGoals >= 7 && this.completedGoals <= 9) {
    this.avatar = '/assets/avatars/hammer.png';
  } else if(this.completedGoals >= 10 && this.completedGoals<= 12){
    this.avatar = '/assets/avatars/saw.png';
  }
  console.log('after', this);
};

module.exports = User;

