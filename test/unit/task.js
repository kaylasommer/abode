'use strict';

var expect    = require('chai').expect,
    Task      = require('../../server/models/task'),
    Goal      = require('../../server/models/goal'),
    dbConnect = require('../../server/lib/mongodb'),
    cp        = require('child_process'),
    Mongo     = require('mongodb'),
    db        = 'abode-test';

  describe('constructor', function(){
    it('should create a new task object', function(){
      var t = {
        name : 'Go to HomeDepot',
        rank : 1,
        goalId : '100000000000000000000002'
        },
      task = new Task(t);
      expect(task).to.be.instanceof(Task);
    });
  });



