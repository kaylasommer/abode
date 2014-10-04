'use strict';

var morgan          = require('morgan'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('express-method-override'),
    session         = require('express-session'),
    RedisStore      = require('connect-redis')(session),
    debug           = require('../lib/debug'),
    security        = require('../lib/security'),
    home            = require('../controllers/home'),
    users           = require('../controllers/users'),
    goals           = require('../controllers/goals'),
    dashboards      = require('../controllers/dashboards'),
    houses          = require('../controllers/houses'),
    recommendations = require('../controllers/recommendations'),
    pages           = require('../controllers/pages');

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
  app.get('/user', users.show);
  app.get('/house', houses.show);
  app.post('/house', houses.create);
  app.put('/house/:houseId', houses.update);
  app.get('/house/:houseId/recommendations', recommendations.byHouse);
  app.post('/task', goals.createTask);
  app.post('/goal', goals.create);
  app.get('/goal', goals.index);
  app.get('/dashboard', dashboards.show);
  app.delete('/goal/:goalId', goals.complete);
  app.put('/goal/:goalId', goals.update);
  app.get('/book', pages.show);
  app.post('/book', pages.create);

  console.log('Express: Routes Loaded');
};
