'use strict';

var Goal = require('../models/goal'),
    User = require('../models/user'),
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

exports.complete = function(req, res){
  User.findById(req.user._id, function(err, user){
    Goal.complete(req.params.goalId, function(err, response){
      user.setAvatar(function(user){
        res.send({user:user});
      });
    });
  });
};

exports.update = function(req, res){
  Goal.update(req.body.goal, function(err, response){
    if(response) {
      res.status(200).end();
    } else {
      res.status(500).end();
    }
  });
};
