'use strict';

var Goal = require('../models/goal');

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
