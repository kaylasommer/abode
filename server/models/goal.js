'use strict';

var Mongo  = require('mongodb');

function Goal(o, userId){
  this.title       = o.title;
  this.due         = new Date(o.due);
  this.dateCreated = new Date();
  this.tasks       = [];
  this.userId      = userId;
}

Object.defineProperty(Goal, 'collection', {
  get: function(){return global.mongodb.collection('goals');}
});

Goal.create = function(o, userId, cb){
  var goal = new Goal(o, userId);
  Goal.collection.save(goal, cb);
};

Goal.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Goal.collection.findOne({_id:_id}, cb);
};

Goal.findAllByUserId = function(id, cb){
  var userId = Mongo.ObjectID(id);
  Goal.collection.find({userId:userId}).toArray(function(err, goals){
    //maybe fix prototype.
  });
};
module.exports = Goal;


