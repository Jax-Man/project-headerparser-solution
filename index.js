// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/whoami', function (req, res) {
  console.log(req.ip, req.rawHeaders.find((el, index, arr) => arr[index - 1] === 'User-Agent'), req.rawHeaders[req.rawHeaders.length - 1]);
  let ipaddress = req.ip;
  let language = req.rawHeaders.find((__, index, arr) => arr[index - 1] === 'Accept-Language');
  let software = req.rawHeaders.find((__, index, arr) => arr[index - 1] === 'User-Agent')
  res.json({ipaddress, language, software});
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
