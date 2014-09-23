'use strict';

var expect    = require('chai').expect,
    Task      = require('../../server/models/task'),
    Goal      = require('../../server/models/goal'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'abode-test';

describe('Task', function(){
  describe('constructor', function(){
    it('should create a new task object', function(done){
      var t = {
        name : 'Go to HomeDepot',
        rank : 1,
        goalId : '100000000000000000000002'
        };
      Task.create(t, function(err, response){
        Goal.findById(t.goalId, function(err, goal){
          console.log('goal from test', goal);
          expect(goal.tasks).to.have.length(1);
          expect(response).to.be.equal(1);
          done();
        });
      });
    });
  });
});



