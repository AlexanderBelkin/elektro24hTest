const express = require('express');

const config = require('../config');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config({path: __dirname + '/.env'})

app.use('/uploads', express.static('uploads'))

const whitelist = [
  'http://localhost:3000',
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./routes'));

const port = config.port;
app.listen(port);