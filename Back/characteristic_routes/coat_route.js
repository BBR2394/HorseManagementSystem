var express = require('express');
var characteristicRouter = express.Router();

var pgsql_pool = require('../session/database.js')

const sex_table_name = "sex"
const coat_table_name = "coat"

characteristicRouter.get('/', function (req, res) {
    res.send("you have to choose between /characteristic/coat, /characteristic/sex ")
});

// define the home page route
characteristicRouter.get('/coat', function (req, res) {
    console.log("GET on /coat /")
    pgsql_pool.query(`SELECT * FROM ${coat_table_name}`, (error, result) => {
        console.log(result);
        if (error) {
            //debug("LOG-1 : error when query on /horses");
            console.log("LOG-1 : error when query on /coat");
            res.status(400).send('ERROR on GET /coat index.js')
        }
        else {
            res.send(result.rows)
        }
    });
});

// define the home page route
characteristicRouter.get('/sex', function (req, res) {
    console.log("GET on /sex /")
    pgsql_pool.query(`SELECT * FROM ${sex_table_name}`, (error, result) => {
        console.log(result);
        if (error) {
            //debug("LOG-1 : error when query on /horses");
            console.log("LOG-1 : error when query on /sex");
            res.status(400).send('ERROR on GET /sex index.js')
        }
        else {
            res.send(result.rows)
        }
    });
});

// define the home page route
characteristicRouter.get('/other', function (req, res) {
    console.log("GET on /other /")
    res.send('other home page');
});

module.exports = characteristicRouter;