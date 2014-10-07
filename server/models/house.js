'use strict';

var Mongo  = require('mongodb'),
    _      = require('underscore'),
    fs     = require('fs'),
    path   = require('path');

function House(o, userId){
  this._id      = Mongo.ObjectID();
  this.loc      = o ? o.loc[0] * 1 : null;
  this.userId   = userId;
  this.specs    = {};
  this.features = [
    {feature: 'gutters', has: false},
    {feature: 'basement', has: false},
    {feature: 'attic', has: false},
    {feature: 'yard', has: false},
    {feature: 'garage', has: false},
    {feature: 'driveway', has: false},
    {feature: 'pool', has: false},
    {feature: 'deck', has: false},
    {feature: 'fireplace', has: false},
    {feature: 'sprinklers', has: false},
    {feature: 'septic tank', has: false}
  ];
}

Object.defineProperty(House, 'collection', {
  get: function(){return global.mongodb.collection('houses');}
});

House.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  House.collection.findOne({_id:_id}, function(err, response){
    var house = Object.create(House.prototype);
    _.extend(house, response);
    cb(err, house);
  });
};

House.save = function(house, cb){
  House.collection.save(house, cb);
};

House.update = function(house, cb){
  house._id = Mongo.ObjectID(house._id);
  house.userId = Mongo.ObjectID(house.userId);

  House.save(house, cb);
};

House.findByUserId = function(id, cb){
  var userId = Mongo.ObjectID(id),
   house;
  House.collection.findOne({userId:userId}, function(err, response){
    house = Object.create(House.prototype);
    _.extend(house, response);
    cb(err, house);
  });
};

House.updatePhoto = function(house, houseId, userId, cb){
  if (!house.photo.size) { return; }
  var dir = __dirname + '/../../client/assets/img/' + houseId,
  exist = fs.existsSync(dir);

  if (!exist){
    fs.mkdirSync(dir);
  }

  var ext = path.extname(house.photo.path),
      name = '/' + new Date().getTime(),
      rel = '/assets/img/' + houseId + name + ext,
      abs = dir + name + ext;

  fs.rename(house.photo.path, abs, function(){
    house.photo = rel;
    house._id      = Mongo.ObjectID(houseId);
    house.loc      = house.loc[0] * 1;
    house.userId   = userId;

    House.collection.save(house, function(){
      cb(null, house);
    });
  });
};

module.exports = House;
