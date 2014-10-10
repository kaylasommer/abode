'use strict';

var House  = require('./house'),
    _      = require('underscore');

function Recommendation(){
}


Object.defineProperty(Recommendation, 'collection', {
  get: function(){return global.mongodb.collection('recommendations');}
});

Recommendation.findForHouse = function(houseId, cb){
  House.findById(houseId, function(err, house){
    if(!house.features.filter){cb(); return;}
    var features = house.features.filter(function(feature){
      return feature.has;
    });
    features = features.map(function(feature){
      return feature.feature;
    });
    Recommendation.collection.find({
      $or:[
        {'necFeature': {$in: features}},
        {'necFeature': null}
      ]}).toArray(function(err, results){
        var recommendations = _.sample(results, 5);
      cb(err, recommendations);
    });
  });
};

module.exports = Recommendation;


