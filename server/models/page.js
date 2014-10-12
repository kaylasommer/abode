'use strict';

var Mongo  = require('mongodb'),
    _      = require('underscore'),
    fs     = require('fs'),
    path   = require('path');

function Page(o, userId){
  this._id      = Mongo.ObjectID();
  this.userId   = Mongo.ObjectID(userId);
  this.desc     = o.desc;
}

Object.defineProperty(Page, 'collection', {
  get: function(){return global.mongodb.collection('pages');}
});

Page.create = function(page, userId, cb){
  console.log('page in .create', page);
  page = new Page(page, userId);
  console.log('after cnstr', page);
  Page.addPhoto(page, cb);
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

Page.addPhoto = function(page, cb){
  if (!page.photo.size) { return; }

  var dir = __dirname + '/../../client/assets/img/' + page._id,
  exist = fs.existsSync(dir),
  self = page;

  if(!exist){
    fs.mkdirSync(dir);
  }

  var ext = path.extname(page.photo.path),
      rel = '/assets/img/' + self._id + '/pic' + ext,
      abs = dir + '/pic' + ext;

  fs.renameSync(page.photo.path, abs);

  self.photo = rel;
  self._id   = Mongo.ObjectID(self._id[0]);
  self.desc  = self.desc[0];

  Page.collection.save(self, cb);
};

module.exports = Page;

