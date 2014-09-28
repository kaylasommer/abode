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
        due : '12/10/14',
        tags: 'Living Room, Extra'
      },
      userId = '000000000000000000000001';
      var g = new Goal(o, userId);
      expect(g).to.be.instanceof(Goal);
    });
  });

  describe('.create', function(){
    it('should create and save a goal object', function(done){
      var o = {
        title : 'New Light Fixture',
        due : '12/10/14',
        tags: 'Living Room, Extra'
      },
      userId = '000000000000000000000001';
      Goal.create(o, userId, function(err, goal){
        expect(goal._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.findAllByUserId', function(){
    it('should find a goal by its userId', function(done){
      var id = '000000000000000000000001';
      Goal.findAllByUserId(id, function(err, goals){
        expect(goals).not.to.be.null;
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a goal by its id', function(done){
      var id = '100000000000000000000001';
      Goal.findById(id, function(err, goal){
        expect(goal._id).to.be.instanceof(Mongo.ObjectID);
        expect(goal.title).to.be.equal('Tile the Kitchen Floor');
        done();
      });
    });
  });

  describe('.remove', function(){
    it('should delete a goal', function(done){
      var id = '100000000000000000000001';
      Goal.remove(id, function(err, response){
        Goal.findById(id, function(err, goal){
          expect(goal).to.be.null;
          done();
        });
      });
    });
  });

  describe('.update', function(){
    it('should update a goal', function(done){
      var goal = {
        _id: '100000000000000000000001',
        title: 'Tile the Kitchen Floor',
        userId: '000000000000000000000001'
      };
      Goal.update(goal, function(err, response){
        Goal.findById(goal._id, function(err, goal){
          expect(goal._id).to.be.instanceof(Mongo.ObjectID);
          done();
        });
      });
    });
  });
});

