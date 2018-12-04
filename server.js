const express = require('express');
const fs = require('fs');
var app = express();

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = (`${now}: ${req.method} ${req.url}`);
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=> {
    if (err) {
      console.log('unable to append to server.log')
    }
  });
  next();
});

app.get('/', (req, res) => {
  res.send({
    name: 'Arie',
    likes: [
      'Biking',
      'Cities'
    ]
  });
});

app.get('/revs', (req, res) => {
  res.send('Car Prediction Input');
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
