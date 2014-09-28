'use strict';

var House = require('../models/house'),
     mp   = require('multiparty');


exports.show = function(req, res){
  House.findByUserId(req.user._id, function(err, house){
    res.send({house:house});
  });
};

exports.create = function(req, res){
  House.create(req.body, req.user._id, function(err, house){
    res.send({house:house});
   });
};

exports.update = function(req, res){
  House.update(req.body.house, function(err, response){
    if(response) {
      res.status(200).end();
    } else {
      res.status(500).end();
    }
  });
};
