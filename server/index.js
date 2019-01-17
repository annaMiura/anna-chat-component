const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3028;
const grabUsernameFromDb = require('../db');

app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/users', (req, res) => {
  return grabUsernameFromDb(req.query.id)
    .then(userObj => {
      res.send(userObj);
    })
    .catch(err => {
      console.error('from server side', err);
    });
});

app.get('/time', (req, res) => {
  console.log('🍄 YO IT HERE', req.query.timeStamp, req.query.phrase)
});

app.listen(port, console.log('listening on port ' + port));
