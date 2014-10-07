'use strict';

var House = require('../models/house'),
    mp    = require('multiparty');

exports.show = function(req, res){
  House.findByUserId(req.user._id, function(err, house){
    res.send({house:house});
  });
};

exports.updatePhoto = function(req, res){
  var form = new mp.Form();
  form.parse(req, function(err, fields, files){
    fields.photo = files.photo[0];

    House.updatePhoto(fields, req.params.houseId, req.user._id, function(err, house){
      console.log('Back to angular>>>>', house);
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
