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

app.post('/analyze', function (req, res) {
  var analyzed = {};
  var toneAnalyzer = watson.tone_analyzer({
    'username': credentials.username,
    'password': credentials.password,
    'version': 'v1'
  });

  toneAnalyzer.tone({
    'text': req.body.text
  }, function (err, tone) {
    if (err) {
      res.send(JSON.stringify(err));
    }
    else {
      tone = tone.children.filter(function (obj) {
        return obj.id
      });

      tone[0].children.forEach(function (item) {
        analyzed[item.id.toLowerCase()] = item.normalized_score;
      });

      res.send(JSON.stringify(analyzed));
    }
  });
});

app.listen(appEnv.port, function() {
  console.log('Server starting on ' + appEnv.url);
});