var express = require('express');
var stableRouter = express.Router();

// middleware that is specific to this router
stableRouter.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
stableRouter.get('/', function(req, res) {
  console.log("GET on /stable /")
  res.send('Stables home page');
});

// define the about route
stableRouter.get('/about', function(req, res) {
  res.send('About stables');
});

module.exports = stableRouter;