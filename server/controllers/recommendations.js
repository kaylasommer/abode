'use strict';

var Recommendation = require('../models/recommendation');

exports.byHouse = function(req, res){
  Recommendation.findForHouse(req.params.houseId, function(err, recommendations){
    res.send({recommendations: recommendations});
  });
};
