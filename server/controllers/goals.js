'use strict';

var Goal = require('../models/goal'),
    Task = require('../models/task');

exports.create = function(req, res){
  Goal.create(req.body, req.user._id, function(err, goal){
    res.send({goal:goal});
   });
};

exports.index = function(req, res){
  Goal.findAllByUserId(req.user._id, function(err, goals){
    res.send({goals:goals});
  });
};

exports.createTask = function(req, res){
  Task.create(req.body, function(err, response){
    if(!err) {
      res.status(200).end();
    } else {
      res.status(500).end();
    }
  });
};

exports.remove = function(req, res){
  Goal.remove(req.body.goalId, function(err, response){
    if(response) {
      res.status(200).end();
    } else {
      res.status(500).end();
    }
  });
};
