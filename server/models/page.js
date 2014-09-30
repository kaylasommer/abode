'use strict';

var Mongo  = require('mongodb'),
    _      = require('underscore'),
    fs     = require('fs'),
    path   = require('path');

function Page(o, userId){
  this.userId   = Mongo.ObjectID(userId);
  this.desc     = o.desc;
}

Object.defineProperty(Page, 'collection', {
  get: function(){return global.mongodb.collection('pages');}
});

Page.create = function(o, userId, cb){
  var page = new Page(o, userId);
  Page.collection.save(page, function(err, page){
    page.addPhoto(o.photo, cb);
  });
};

Page.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Page.collection.findOne({_id:_id}, function(err, response){
    var page = Object.create(Page.prototype);
    _.extend(page, response);
    cb(err, page);
  });
};

Page.findAllByUserId = function(id, cb){
  var userId = Mongo.ObjectID(id),
   page;
  Page.collection.find({userId:userId}).toArray(function(err, response){
    var pages = response.map(function(res){
      page = Object.create(Page.prototype);
      _.extend(page, res);
      return page;
    });
    cb(err, pages);
  });
};

Page.prototype.addPhoto = function(file, cb){
  if (!file || !file.size) { return; }

  var dir = __dirname + '/../../client/assets/img/' + this._id,
  exist = fs.existsSync(dir),
  self = this;

  if(!exist){
    fs.mkdirSync(dir);
  }

  var ext = path.extname(file.path),
      rel = '/assets/img/' + self._id + '/pic' + ext,
      abs = dir + '/pic' + ext;

  fs.renameSync(file.path, abs);
  self.photo = rel;

  Page.collection.save(self, cb);
};

module.exports = Page;

