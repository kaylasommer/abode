'use strict';

var User = require('../models/user');

exports.register = function(req, res){
  var credentials = {
    email: req.body.email,
    password: req.body.password
  };
  User.register(req.body, function(err, newUser){
    User.login(credentials, function(err, user){
      if(user){
        req.session.regenerate(function(){
          req.session.userId = user._id;
          req.session.save(function(){
            res.setHeader('X-Authenticated-User', user.email);
            res.status(200).end();
          });
        });
      }else{
        res.status(400).end();
      }
    });
  });
};

exports.login = function(req, res){
  User.login(req.body, function(err, user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id;
        req.session.save(function(){
          res.setHeader('X-Authenticated-User', user.email);
          res.status(200).end();
        });
      });
    }else{
      res.status(401).end();
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(){
    res.setHeader('X-Authenticated-User', 'anonymous');
    res.status(200).end();
  });
};

exports.show = function(req, res){
  User.findById(req.user._id, function(err, user){
    user.password = undefined;
    res.send({user:user});
  });
};

exports.subscribe = function(req, res){
  User.findById(req.user._id, function(err, user){
    user.subscribe(req.body, function(user){
      res.send({user:user});
    });
  });
};
