'use strict';

var expect    = require('chai').expect,
    Goal      = require('../../server/models/goal'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'abode-test';

describe('Goal', function(){
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
    it('should create a new goal object', function(){
      var o = {
        title : 'New Light Fixture',
        due : '12/10/14'
      },
      userId = '000000000000000000000001',
      g = new Goal(o, userId);
      expect(g).to.be.instanceof(Goal);
    });
  });

  describe('.create', function(){
    it('should create and save a goal object', function(done){
      var o = {
        title : 'New Light Fixture',
        due : '12/10/14'
      },
      userId = '000000000000000000000001';
      Goal.create(o, userId, function(err, goal){
        expect(goal._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  
/*  describe('.findById', function(){
    it('should find a user', function(done){
      var id = '000000000000000000000001';
      User.findById(id, function(err, user){
        expect(user._id).to.be.instanceof(Mongo.ObjectID);
        expect(user.email).to.be.equal('bob@aol.com');
        done();
      });
    });
  });*/

});

