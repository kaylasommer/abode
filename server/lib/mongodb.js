'use strict';

var MongoClient = require('mongodb').MongoClient;

module.exports = function(conn, cb){
  MongoClient.connect(conn, function(err, db){
    global.mongodb = db;

    console.log('Express: Database');
    if(cb){cb();}
  });
};
