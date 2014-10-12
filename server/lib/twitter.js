'use strict';

var Twitter = require('node-tweet-stream');

module.exports = function(io){
  var t = new Twitter({
    consumer_key: process.env.TWIT_CONSUMER_Key,
    consumer_secret: process.env.TWIT_CONSUMER_Sec,
    token: process.env.TWIT_ACCESS_Tok,
    token_secret: process.env.TWIT_ACCESS_Sec
  });

  t.track('renovations');
  t.track('hgtv');
  t.track('homeandgarden');
  t.track('abodedemo');

  t.on('error', function(err){
    console.log('tweet error ', err);
  });

  return t;
};
