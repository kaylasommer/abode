'use strict';

var House          = require('../models/house'),
    User           = require('../models/user'),
    Goal           = require('../models/goal');

exports.show = function(req, res){
  User.findById(req.user._id, function(err, user){
    House.findByUserId(user._id, function(err, house){
      Goal.findAllByUserId(user._id, function(err, goals){
        res.send({user:user, house:house, goals:goals});
      });
    });
  });
};
