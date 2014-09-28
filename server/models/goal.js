'use strict';

var Mongo  = require('mongodb'),
    _      = require('underscore');

function Goal(o, userId){
  this.title       = o.title;
  this.tags        = o.tags.split(',').map(function(t){
                      return t.trim();
                    });
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
  var userId = Mongo.ObjectID(id),
      goal;
  Goal.collection.find({userId:userId}).sort({createdDate:-1}).toArray(function(err, response){
    var goals = response.map(function(res){
      goal = Object.create(Goal.prototype);
      _.extend(goal, res);
      return goal;
    });
    cb(err, goals);
  });
};

Goal.remove = function(id, cb){
  Goal.collection.remove({_id: Mongo.ObjectID(id)}, cb);
};

Goal.update = function(goal, cb){
  goal._id = Mongo.ObjectID(goal._id);
  goal.userId = Mongo.ObjectID(goal.userId);

  Goal.collection.save(goal, cb);
};

module.exports = Goal;


