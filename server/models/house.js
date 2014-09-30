'use strict';

var Mongo  = require('mongodb'),
    _      = require('underscore'),
    fs     = require('fs'),
    path   = require('path');

function House(o, userId){
  this.loc      = o.loc * 1;
  this.userId   = userId;
  this.specs    = {};
}

Object.defineProperty(House, 'collection', {
  get: function(){return global.mongodb.collection('houses');}
});

House.create = function(o, userId, cb){
  var house = new House(o, userId);
  House.collection.save(house, function(err, house){
    house.addPhoto(o.photo, cb);
  });
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

House.prototype.addPhoto = function(file, cb){
  if (!file || !file.size) { return; }
  var dir = __dirname + '/../../client/assets/img/' + this._id,
  exist = fs.existsSync(dir),
  self = this;

  if(!exist){
    fs.mkdirSync(dir);
  }

  var ext = path.extname(file.path),
      name = '/house',
      rel = '/assets/img/' + self._id + name + ext,
      abs = dir + name + ext;

  fs.renameSync(file.path, abs);
  self.photo = rel;

  House.collection.save(this, cb);
};

module.exports = House;
