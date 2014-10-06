'use strict';

var Mongo  = require('mongodb'),
    _      = require('underscore'),
    fs     = require('fs'),
    path   = require('path');

function House(o, userId){
  this._id      = Mongo.ObjectID();
  this.loc      = o.loc[0] * 1;
  this.userId   = userId[0];
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

House.create = function(house, userId, cb){
  if(!house._id[0]){house = new House(house, userId);}
  House.addPhoto(house, cb);
};

House.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  House.collection.findOne({_id:_id}, function(err, response){
    var house = Object.create(House.prototype);
    _.extend(house, response);
    cb(err, house);
  });
};

House.update = function(house, cb){
  house._id = Mongo.ObjectID(house._id);
  house.userId = Mongo.ObjectID(house.userId);

  House.collection.save(house, cb);
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

House.addPhoto = function(house, cb){
  if (!house.photo.size) { return; }
  var dir = __dirname + '/../../client/assets/img/' + house._id,
  exist = fs.existsSync(dir),
  self = house;

  if(!exist){
    fs.mkdirSync(dir);
  }

  var ext = path.extname(house.photo.path),
      name = '/house',
      rel = '/assets/img/' + self._id + name + ext,
      abs = dir + name + ext;

  fs.renameSync(house.photo.path, abs);

  self.photo = rel;
  self._id      = Mongo.ObjectID(self._id[0]);
  self.loc      = self.loc[0] * 1;
  self.userId   = Mongo.ObjectID(self.userId[0]);

  House.collection.save(house, function(){
    cb(null, self);
  });
};

module.exports = House;
