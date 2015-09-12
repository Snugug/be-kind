'use strict';

var express = require('express'),
    watson = require('watson-developer-cloud'),
    cfenv = require('cfenv');

var app = express(),
    appEnv = cfenv.getAppEnv(),
    credentials = {};

if (process.env.VCAP_SERVICES) {
  credentials = JSON.parse(process.env.VCAP_SERVICES).tone_analyzer[0].credentials;
}

app.use(express.static(__dirname + '/public'));

app.get('/analyze', function (req, res) {
  var toneAnalyzer = watson.tone_analyzer({
    'username': credentials.username,
    'password': credentials.password
  });

  toneAnalyzer.tone({
    'text': "I've got a lovely bunch of coconuts. Here they are a standing in a row. Big ones, small ones, some as big as your head! Give 'em a twist, a flick of the wrist, that's what the showman said."
  }, function (err, tone) {
    if (err) {
      res.send(JSON.stringify(err));
    }
    else {
      res.send(JSON.stringify(tone));
    }
  });
});

app.listen(appEnv.port, function() {
  console.log('Server starting on ' + appEnv.url);
});