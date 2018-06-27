const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const scrape = require('./scrape');

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set CORS headers
app.use(cors());

// Require our routes into the application.
app.post('/', async (req, res) => {
  try {
    const url = decodeURI(req.body.url);
    const xPath = decodeURI(req.body.xPath);
    const result = await scrape(url, xPath);
    res.status(200).send({ values: [result] });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = app;