'use strict';

    var Goal  = require('../models/goal');

function Task(o){
  this.name = o.name;
  this.rank = o.rank;
  this.isComplete = false;
}

Task.create = function(o, cb){
  var goalId = o.goalId,
      task = new Task(o);
  Goal.findById(goalId, function(err, goal){
    goal.tasks.push(task);
    Goal.collection.save(goal, cb);
  });
};

module.exports = Task;

