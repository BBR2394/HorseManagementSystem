var express = require('express');
var horseRouter = express.Router();

var express = require('express');
var horseRouter = express.Router();


// define the home page route
horseRouter.get('/', function(req, res) {
  console.log("GET on /hrs /")
  res.send('horse home page');
});

// define the about route
horseRouter.get('/about', function(req, res) {
  res.send('About horses');
});

module.exports = horseRouter;