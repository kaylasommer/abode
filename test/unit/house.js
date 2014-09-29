'use strict';

var expect    = require('chai').expect,
    House      = require('../../server/models/house'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'abode-test';

describe('House', function(){
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
    it('should create a new House object', function(){
      var o = {
        _id : 'a00000000000000000000003',
        loc : '39180',
        photo : 'fakepic.jpg',
        },
      userId = '000000000000000000000001',
      h = new House(o, userId);
      expect(h).to.be.instanceof(House);
    });
  });

  describe('.findByUserId', function(){
    it('should find a house', function(done){
      var id = '000000000000000000000001';
      House.findByUserId(id, function(err, house){
        expect(house._id).to.be.instanceof(Mongo.ObjectID);
        expect(house.loc).to.equal('37207');
        done();
      });
    });
  });

  describe('#update', function(){
    it('should update a house', function(done){
      var id = '000000000000000000000001';
      House.findByUserId(id, function(err, house){
        house.loc = '38732';
        house.update(function(err, house){});

        expect(house._id).to.be.instanceof(Mongo.ObjectID);
        expect(house.loc).to.equal('38732');
        done();
      });
    });
  });
});

