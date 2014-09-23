'use strict';

var Mongo = require('mongodb'),
    Goal  = require('../models/goal');

function Task(o){
  this.name = o.name;
  this.rank = o.rank;
  this.goalId =  new Mongo.ObjectID(o.goalId);
}

Task.create = function(o, cb){
  var goalId = o.goalId,
      task = new Task(o);
  console.log('<<<Task>>>>>', task);
  Goal.findById(goalId, function(err, goal){
  console.log('<<<Goal>>>>>', goal);
    goal.tasks.push(task);
    Goal.collection.save(goal, cb);
  });
};

module.exports = Task;

