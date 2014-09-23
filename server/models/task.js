'use strict';

var Mongo = require('mongodb'),
    Goal  = require('../models/goal');

function Task(o){
  this.name = o.name;
  this.rank = o.rank;
  this.goalId = Mongo.ObjectID(o.goalId);
}

Task.create = function(o, cb){
  var task = new Task(o);
  Goal.findById(task.goalId, function(err, goal){
    console.log('goal before>>>>>>', goal);
    goal.tasks.push(task);
    console.log('goal after>>>>>>', goal);
    Goal.collection.save(goal, cb);
  });
};

module.exports = Task;

