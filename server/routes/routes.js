'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    debug          = require('../lib/debug'),
    security       = require('../lib/security'),
    home           = require('../controllers/home'),
    users          = require('../controllers/users'),
    goals          = require('../controllers/goals'),
    houses         = require('../controllers/houses');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../../public'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));

  app.use(security.authenticate);
  app.use(debug.info);

  app.get('/home', home.index);
  app.post('/register', users.register);
  app.post('/login', users.login);

  app.use(security.bounce);
  app.delete('/logout', users.logout);
  //app.post('/register', users.update);
  app.post('/goal', goals.create);
  app.get('/goal', goals.index);
  app.delete('/goal/:goalId', goals.remove);
  app.put('/goal/:goalId', goals.update);
  app.post('/task', goals.createTask);
  app.get('/user', users.show);
  app.get('/house', houses.show);
  app.post('/house', houses.create);
  //app.get('/book', users.index);
  //app.post('/book', users.create);

  console.log('Express: Routes Loaded');
};
