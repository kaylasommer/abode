'use strict';

var House = require('../models/house'),
    mp    = require('multiparty');

exports.show = function(req, res){
  House.findByUserId(req.user._id, function(err, house){
    res.send({house:house});
  });
};

exports.create = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    var o = {
      loc: fields.loc[0],
      photo: files.photo[0]
    };

    House.create(o, req.user._id, function(err, house){
      res.send({house:house});
    });
  });
};

exports.update = function(req, res){
  House.update(req.body, function(err, response){
      if(response) {
        res.status(200).end();
      } else {
        res.status(500).end();
      }
  });
};
