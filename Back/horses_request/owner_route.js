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

ownerRoute.post('/', function (req, res) {
    console.log("POST /owner");
    const { lastname, firstname, phone } = req.body;
    console.log(req.body);
    console.log(`data received ${lastname} ${firstname} `)
    if (req.body == null) {
        console.log("error 1");
        res.status(206).send("missing information");
    } else if (lastname == null || firstname == null || phone == null) {
        console.log("error 1");
        res.status(206).send("bad information for lastname firstname or phone");
    }
    else {
        pgsql_pool.query(`INSERT INTO ${owner_table_name} (lastname, firstname, contact_details_owner) VALUES ($1, $2, $3)`, [lastname, firstname, phone], (error, results) => {
            if (error) {
                throw error
            }
            else {
                console.log(results);
                res.status(201).send(`Owner added ${lastname} ${firstname}`)
            }
        })
    }
})

module.exports = ownerRoute;