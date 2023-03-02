// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

app.get('/api', (req, res) => {
  let currentDate = new Date().toUTCString()
  let currentUnix = Date.parse(currentDate)
  res.json({ unix: currentUnix, utc: currentDate })
})
app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date
  let dateStringRegex = /^[0-9]+$/
  let numbersOnly = dateStringRegex.test(dateString)
 
  if (!numbersOnly) {
    let unixTimestamp = Date.parse(dateString)
    let utcDate = new Date(unixTimestamp).toUTCString()
 
    unixTimestamp
    ? res.json({ unix: unixTimestamp, utc: utcDate })
    : res.json({ error: "Invalid Date" })
  } 
  else {
    let unixTimestamp = parseInt(dateString)
    let actualDate = new Date(unixTimestamp)
    let utcDate = actualDate.toUTCString()
 
    res.json({ unix: unixTimestamp, utc: utcDate })
  }
 })


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
