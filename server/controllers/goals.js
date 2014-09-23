'use strict';

var Goal = require('../models/goal');

exports.create = function(req, res){
  Goal.create(req.body, req.user._id, function(err, goal){
    res.send({goal:goal});
   });
};

exports.index = function(req, res){

};
