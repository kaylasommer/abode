'use strict';

var expect    = require('chai').expect,
    User      = require('../../server/models/user'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'abode-test';

describe('User', function(){
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
    it('should create a new User object', function(){
      var o = {
        email : 'sue@aol.com',
        password : '1234',
        },
      u = new User(o);
      expect(u).to.be.instanceof(User);
    });
  });

  describe('.findById', function(){
    it('should find a user', function(done){
      var id = '000000000000000000000001';
      User.findById(id, function(err, user){
        expect(user._id).to.be.instanceof(Mongo.ObjectID);
        expect(user.email).to.be.equal('frank@aol.com');
        done();
      });
    });
  });

  describe('#setAvatar', function(){
    it('should add an avatar attribute to the user', function(done){
      var id = '000000000000000000000001';
      User.findById(id, function(err, user){
        user.setAvatar(function(){
          expect(user.avatar).to.equal('/assets/avatars/duct-tape.png');
          done();
        });
      });
    });
  });

});
