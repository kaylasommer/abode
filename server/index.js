'use strict';

var port    = process.env.PORT,
    db      = process.env.MONGOLAB_URI,
    express = require('express'),
    app     = express(),
    server  = require('http').Server(app);

require('./lib/config')(app);
require('./routes/routes')(app, express);

require('./lib/mongodb')(db, function(){
  require('./lib/sockets')(server, function(){
    server.listen(port);
  });
});


module.exports = app;
