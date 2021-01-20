/**
 * This is the back of my project HMS 
 * It is made during and for my second year of master at La Catho in Lille (France)
 * year : 2020/2021
 */

 /**
  * general const value for the app
  */
const port = 5008
const appName = "Horse Management System"

/**
 * dependencies
 */
//exress : the package to create a httpp server
const express = require('express')
const app = express()
// for debug
var debug = require('debug')('app');
//useful pppackage to color console log
const chalk = require('chalk');
// useful package to manage path to a file
var path = require('path');
// package for the db
var postgresql = require('pg').Pool;
// passort
const passort = require('passport');
const cookieParser = require('cookie-parser');
//package used in order to parse the body from a POST request
// otherwise, exppress doesnt read the body ...
const bodyParser = require('body-parser')
// for passport too
const session = require('express-session');
//CORS to authorize any call on the api (to check for more information)
var cors = require('cors')

/**
 * postgresql configuration
 */
/**
 * I HAVE TO PUT THESE DATA SMEWHERE ELSE
 * AND MOR SECURLY
 */
const poolpgsql = new postgresql({
  user: 'Baptiste',
  host: 'localhost',
  database: 'hms',
  password: 'TotoTiti23',
  port: 5432,
})

//to moove in a config directory
// initialize passport
var sessionRoutes = require('./session/passport.js')

//to set body arser to read json in the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//!!! warning dont forget the () https://stackoverflow.com/questions/23207303/no-response-from-simple-expressjs-app
app.use(cookieParser());
app.use(session({secret: 'bonjour'}));
app.use(cors());
//warning : this require must be here because it initialize passport
require('./session/passport.js')(app);
/**
 * external module (files)
 * we add a file for route
 */
var stables = require('./stable_request/hms_stable.js')
var horseRoute = require('./horses_request/horse_routes.js')
var authentRoutes = require('./authent/authenticationRoutes.js')
var coatRoutes = require('./characteristic_routes/coat_route.js');
var ownerRoutes = require('./horses_request/owner_route.js');
// #routes
// the routes /stable -> hms_stable.js file #stable

app.use('/stables', stables);
app.use('/hrs', horseRoute);
app.use('/characteristic', coatRoutes);
app.use('/owners', ownerRoutes)
app.use('/authent', authentRoutes);
app.use('/session', sessionRoutes);


app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/test_views/form.html')
});

/** 
 * transferé dans horses_request/get_request
*/
/*app.get('/horses',(req, res) => {
  poolpgsql.query('SELECT * FROM horses_temp', (error, result) => {
    console.log(result);
    if (error) {
      debug("LOG-1 : error when query on /horses");
      console.log("LOG-1 : error when query on /horses");
      res.status(400).send('ERROR on GET /horses index.js')
    }
    else {
      res.send('on GET /horses index.js')
    }
  });

})
*/

app.get('/horse',(req, res) => {
    res.send('on GET /horse So only one horse with name or id')
})



//transferé dans horses_request/get_request
/*app.post('/horses', (req, res) => {
  console.log("LOG: POST on /horses");
  //console.log(req);
  console.log(req.body);
  //const { name } = req.body;
  res.send("<h3>POST sur /horses</h3>");
})*/

//CECi est le point d'entrée 
// et la le oint d'entree est le port indiqué en haut

app.listen(port, () => {
  console.log(`${chalk.yellow(`${appName} listening on`)} http://localhost:${port} :: ` + chalk.redBright(`${port}`))
  debug("LOG : app started")
})

// we import another module #horses
require('./horses_request/get_request.js')(app, poolpgsql);
//require('./authent/authentication.js')(app, bodyParser);
