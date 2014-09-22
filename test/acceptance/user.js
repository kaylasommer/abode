'use strict';

process.env.DB   = 'hippie-test';

var expect  = require('chai').expect,
    cp      = require('child_process'),
    app     = require('../../server/index'),
    cookie  = null,
    request = require('supertest');

describe('users', function(){
  before(function(done){
    request(app).get('/').end(done);
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [process.env.DB], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      request(app)
      .post('/register')
      .send('email=jeremy@aol.com')
      .send('password=1234')
      .end(function(err, res){
        cookie = res.headers['set-cookie'][0];
        done();
      });
    });
  });

  describe('get /', function(){
    it('should show the home page', function(done){
      request(app)
      .get('/')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe('get /dashboard', function(){
    it('should bounce an unauthorized user', function(done){
      request(app)
      .get('/dashboard')
      .end(function(err, res){
        expect(res.status).to.equal(401);
        done();
      });
    });
  });

  describe('get /dashboard', function(){
    it('should take a user to their Dashboard', function(done){
      request(app)
      .get('/dashboard')
      .set('cookie', cookie)
      .end(function(err, res){
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});
