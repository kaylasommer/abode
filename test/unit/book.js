'use strict';

var expect    = require('chai').expect,
    Page      = require('../../server/models/page'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'abode-test';

describe('Page', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Page object', function(){
      var o = {
        _id : 'a00000000000000000000003',
        desc : 'I like the chair in the corner.',
        photo : 'fakepic.jpg',
        },
      userId = '000000000000000000000001',
      p = new Page(o, userId);
      expect(p).to.be.instanceof(Page);
    });
  });

  /*describe('.findById', function(){
    it('should find a book', function(done){
      var id = 'a00000000000000000000001';
      House.findById(id, function(err, house){
        expect(house.loc).to.equal(37207);
        done();
      });
    });
  });

  describe('.findByUserId', function(){
    it('should find a house by userId', function(done){
      var id = '000000000000000000000001';
      House.findByUserId(id, function(err, house){
        expect(house._id).to.be.instanceof(Mongo.ObjectID);
        expect(house.loc).to.equal(37207);
        done();
      });
    });
  });*/

});


