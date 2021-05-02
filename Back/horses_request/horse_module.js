/**
 * This file was made in the way to export a module
 * and it doesn't use the package "router"
 * So, I will, when I am going to refactor the code, move that in horse_routes
 */

module.exports = function(app, pgsql) {
    
    const horses_table_name = "horses"
    const sex_table_name = "sex"
    const coat_table_name = "coat"

    app.get('/horses', (req, res) => {
        console.log("LOG: GET on /horses");
        const params = {
            name: req.query.name,
            id: req.query.id
        }
        if (params.name != null) {
            //console.log("il y a un nom dans la requete")
            //console.log(params.name)
            pgsql.query(`SELECT hrs.horse_id, hrs.horse_name, size, lastname, firstname, color_name, hrs.id_stables 
            FROM ${horses_table_name}  hrs
            LEFT JOIN horse_owner ownr ON ownr.owner_id = hrs.current_owner
            LEFT JOIN coat ct ON ct.id = hrs.coat
            WHERE horse_name='${params.name}'`, (error, result) => {
                console.log("le resultat : " + result);
                if (error) {
                    console.log("LOG-1bis : error when query on /horses?name="+params.name);
                    res.status(400).send('ERROR on GET /horses index.js')
                }
                else {
                    res.send(result.rows)
                }
            });
        } else if (params.id != null) {
            console.log("recuperation d'un cheval en fonction de son id ")
            console.log(`id = ${params.id}`)
            pgsql.query(`SELECT *
            FROM ${horses_table_name}  hrs
            WHERE horse_id='${params.id}'`, (error, result) => {
                console.log("le resultat : " + result);
                if (error) {
                    console.log("LOG-1 id : error when query on /horses?name="+params.id);
                    res.status(400).send('ERROR on GET /horses index.js')
                }
                else {
                    res.send(result.rows)
                }
            });
        }
        else {
            pgsql.query(`SELECT hrs.horse_id, hrs.horse_name, size, lastname, firstname, color_name, hrs.id_stables 
            FROM ${horses_table_name} hrs
            LEFT JOIN horse_owner ownr ON ownr.owner_id = hrs.current_owner
            LEFT JOIN coat ct ON ct.id = hrs.coat`, (error, result) => {
                console.log(result);
                if (error) {
                    //debug("LOG-1 : error when query on /horses");
                    //console.log("LOG-1 : error when query on /horses");
                    res.status(400).send('ERROR on GET /horses index.js')
                }
                else {
                    res.send(result.rows)
                }
            });
        }
    })

    app.post('/horses', (req, res) => {
        console.log("LOG: POST on /horses");
        //console.log(req);
        const { horse_name, coat, sex } = req.body;
        //console.log(horse_name)
        //console.log(coat)
        //console.log(sex)
        var sex_id = null
        var coat_id = null
        var owner_id = null
        if (req.body == null) {
            res.status(206).send("missing information");
        }else if (horse_name == null) {
            res.status(206).send("missing information : no horse name given");
        }
        else {
            /*if (coat != null) {
                console.log(`SELECT color_name FROM ${coat_table_name} WHERE color_name = ${coat}`);
                coat_id = pgsql.query(`SELECT color_name FROM ${coat_table_name} WHERE color_name = $1`, [coat], (error, results) => {
                    if (error) {
                        throw error
                    }
                    else {
                        console.log(results);
                    }
                })
            }
            if (sex != null) {
                sex_id = pgsql.query(`SELECT sex_name FROM ${sex_table_name} WHERE sex_name = $1`, [sex], (error, results) => {
                    if (error) {
                        throw error
                    }
                    else {
                        console.log(results);
                    }
                })
            }*/
            console.log(`sex id = ${sex_id} et coat id ${coat_id} `);
            pgsql.query(`INSERT INTO ${horses_table_name} (horse_name, current_owner, sex, coat) VALUES ($1, $2, $3, $4)`, [horse_name, owner_id, sex_id, coat_id], (error, results) => {
                if (error) {
                    throw error
                }
                else {
                    console.log(results);
                    res.status(201).send(`Horse added ${horse_name}`)
                }
            })
        }
    })

    app.patch('/horses', (req, res) => { 
        console.log("LOG: PATCH on /horses");

    });

    app.post('/horses/move', (req, res) => { 
        console.log("LOG: POST on /horses/move");
        const { horse_id, stable_id, horse_name, stable_name } = req.body;
        //UPDATE horses h SET id_stables = 3 WHERE  horse_id = 7
        console.log(horse_id)
        console.log(stable_id)
        res.send("sto our le moment")
        if (!horse_name || !stable_name) {
            pgsql.query(
                `UPDATE ${horses_table_name} h
                SET id_stables = $2
                WHERE horse_id = $1`, 
                [horse_id, stable_id], 
                (error, results) => {
                if (error) {
                    throw error
                }
                else {
                    console.log(results);
                    //res.status(201).send(`Horse whit id ${horse_id} mooved to stable id ${stable_id}`)
                }
            })
        } else if (!horse_id || !stable_id) {
            console.log("changement en focntion du nom")
        } else {
            //res.status(206).send("missing information : you must provide both id");
        }
        
    });

    app.delete('/horses', (req, res) => { 
        const params = {
            name: req.query.name
        }
        if (params.name != null) {
            pgsql.query(`DELETE FROM ${horses_table_name} WHERE horse_name = $1`, [params.name], (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).send(`Horse deleted with name: ${params.name}`)
              })
        }
        else {
            res.status(200).send("nothing deleted");
        }
    })


}