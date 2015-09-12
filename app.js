'use strict';

var express = require('express'),
    cfenv = require('cfenv');

var app = express(),
    appEnv = cfenv.getAppEnv();


app.use(express.static(__dirname + '/public'));

app.listen(appEnv.port, function() {
  console.log('Server starting on ' + appEnv.url);
});