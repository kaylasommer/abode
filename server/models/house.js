'use strict';

var Mongo  = require('mongodb'),
    _      = require('underscore'),
    fs     = require('fs'),
    path   = require('path');

function House(o, userId){
  this.loc      = o.loc;
  this.photo    = o.photo;
  this.specs    = o.specs;
  this.userId   = userId;
}

Object.defineProperty(House, 'collection', {
  get: function(){return global.mongodb.collection('houses');}
});

House.create = function(o, userId, cb){
  var house = new House(o, userId);
  House.collection.save(house, cb);
};


House.prototype.update = function(cb){
  this._id = Mongo.ObjectID(this._id);
  this.userId = Mongo.ObjectID(this.userId);

  House.collection.save(this, cb);
};

House.findByUserId = function(id, cb){
  var userId = Mongo.ObjectID(id),
      house;
  House.collection.findOne({userId:userId}, function(err, response){
    var houses = null;
    if (response) {
      houses = response.map(function(res){
        house = Object.create(House.prototype);
        _.extend(house, res);
        return house;
      });
    }

    cb(err, houses);
  });
};


module.exports = House;
