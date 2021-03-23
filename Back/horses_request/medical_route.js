var express = require('express');
var medicRouter = express.Router();

var pgsql_pool = require('../session/database.js')

const veterinarian_table_name = "veterinarian"
const medic_intervention_table_name = "medical_intervention"
const type_medic_intervention_table_name = "type_medic_intervention"

medicRouter.get('/vet', function (req, res) {
    console.log("GET /vet ");
    pgsql_pool.query(`SELECT * FROM ${veterinarian_table_name}`, (error, result) => {
        console.log(result.rows);
        if (error) {
            //debug("LOG-1 : error when query on /horses");
            console.log("LOG-1 : error when query on /sex");
            res.status(400).send('GET /veterinarian_table_name medical_route.js')
        }
        else {
            res.send(result.rows)
        }
    });
})

//to add a new vet in the list
// Warning : the trigram must be send when we create the new vet
medicRouter.post('/vet', function (req, res) {
    console.log("POST /vet");
    const { lastname, firstname, phone, trig } = req.body;
    console.log(req.body);
    console.log(`data received lastname : ${lastname} firstname : ${firstname} TRIGRAMME : ${trig}`)
    if (req.body == null) {
        console.log("error 1");
        res.status(206).send("missing information");
    } else if (lastname == null || firstname == null || phone == null) {
        console.log("error 1");
        res.status(206).send("bad information for lastname firstname or phone");
    }
    else {
        pgsql_pool.query(`INSERT INTO ${veterinarian_table_name} (lastname, firstname, trigramme, phone) VALUES ($1, $2, $3, $4)`, [lastname, firstname, trig, phone], (error, results) => {
            if (error) {
                throw error
            }
            else {
                console.log(results);
                res.status(201).send(`Vet added ${lastname} ${firstname}`)
            }
        })
    }
})

// TODO : add the intervention date
medicRouter.get('/intervention', function (req, res) {
    console.log("GET /intervention ici");
    pgsql_pool.query(`SELECT type_medic_name, mi.note, horse_name, lastname, firstname 
    FROM medical_intervention mi
    LEFT JOIN type_medic_intervention tp ON tp.id = type_intervention
    LEFT JOIN horses hrs ON hrs.horse_id = mi.horse_id
    LEFT JOIN veterinarian vet ON vet.vet_id = mi.vet_id`, (err, result) => {
        if (err) {
            throw err
        } else {
            console.log("result ")
            res.send(result.rows)
        }
    });

    
})

//to add a new intervention
medicRouter.post('/intervention', function (req, res) {
    console.log("POST /interventionet");
    const { vet_id, type_medic_id, report, horse } = req.body;

    const hrsId = horse.horse_id;
    console.log(`${vet_id}, ${type_medic_id}, ${report}, ${hrsId} ${horse}`)
    if (req.body == null) {
        res.status(206).send("missing information");
    } else {
        pgsql_pool.query(`INSERT INTO ${medic_intervention_table_name} 
        (horse_id, vet_id, type_intervention, note) VALUES ($1, $2, $3, $4)`, [hrsId, vet_id, type_medic_id, report], (error, results) => {
            if (error) {
                console.log("ERROR")
                throw error
            }
            else {
                console.log(`tou c'est bien passé ${results}`);
                res.status(201).send(`intervention medic added report : ${report}`)
            }
        })
    }

})

medicRouter.get('/typemedicintervention', function (req, res) {
    console.log("GET /typemedicintervention");
    pgsql_pool.query(`SELECT * FROM ${type_medic_intervention_table_name}`, (error, result) => {
        console.log(result.rows);
        if (error) {
            //debug("LOG-1 : error when query on /horses");
            console.log("LOG-1 : error when query on /sex");
            res.status(400).send('GET /typemedicintervention medical_route.js')
        }
        else {
            res.send(result.rows)
        }
    });
})

module.exports = medicRouter;