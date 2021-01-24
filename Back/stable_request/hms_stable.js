var express = require('express');
var stableRouter = express.Router();

var pgsql_pool = require('../session/database.js')

const stable_table_name = "stables";

// middleware that is specific to this router
stableRouter.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
stableRouter.get('/', function (req, res) {
  console.log("GET on /stable /")
  const params = {
    name: req.query.name
  }
  if (params.name != null) {
    console.log("il y a un nom dans la requete")
    pgsql_pool.query(`SELECT * FROM ${stable_table_name} WHERE name='${params.name}'`, (error, result) => {
      console.log(result.rows);
      if (error) {
        debug("LOG-1bis : error when query on /horses?name=");
        console.log("LOG-1bis : error when query on /horses?name=");
        res.status(400).send('ERROR on GET /horses index.js')
      }
      else {
        res.send(result.rows)
      }
    });
  } else {
    pgsql_pool.query(`SELECT * FROM ${stable_table_name}`, (error, result) => {
      console.log(result);
      if (error) {
        //debug("LOG-1 : error when query on /horses");
        console.log("LOG-1 : error when query on /horses");
        res.status(400).send('ERROR on GET /horses index.js')
      }
      else {
        res.send(result.rows)
      }
    });
  }
});

stableRouter.post('/', function (req, res) {
  console.log("POST on /stable /")
  console.log(req);
  console.log(req.body);
  const { name, nb, addr, city, postcode } = req.body;
  if (req.body == null) {
    res.status(206).send("missing information");
  }
  else {
    pgsql_pool.query(`INSERT INTO ${stable_table_name} (stable_name, nb_addr, address, postcode, city) 
    VALUES ($1, $2, $3, $4, $5)`, [name, nb, addr, postcode, city], (error, results) => {
      if (error) {
        throw error
      }
      else {
        console.log(results);
        res.status(201).send(`Stable added ${name}`)
      }
    })
  }
});

// define the about route
stableRouter.get('/about', function (req, res) {
  res.send('About stables');
});

module.exports = stableRouter;