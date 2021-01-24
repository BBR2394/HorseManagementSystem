var express = require('express');
var ownerRoute = express.Router();

var pgsql_pool = require('../session/database.js')

const owner_table_name = "horse_owner"

// define the owner page route
ownerRoute.get('/', function (req, res) {
    console.log("GET on /owners /")
    pgsql_pool.query(`SELECT * FROM ${owner_table_name}`, (error, result) => {
        console.log(result.rows);
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

module.exports = ownerRoute;