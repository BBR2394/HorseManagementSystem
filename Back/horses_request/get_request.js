module.exports = function(app, pgsql) {
    
    const horses_table_name = "horses"

    app.get('/horses', (req, res) => {
        console.log("LOG: GET on /horses");
        const params = {
            name: req.query.name
        }
        if (params.name != null) {
            console.log("il y a un nom dans la requete")
            console.log(params.name)
            pgsql.query(`SELECT hrs.horse_name, size, lastname, firstname, color_name 
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
        }
        else {
            pgsql.query(`SELECT hrs.horse_name, size, lastname, firstname, color_name 
            FROM ${horses_table_name} hrs
            LEFT JOIN horse_owner ownr ON ownr.owner_id = hrs.current_owner
            LEFT JOIN coat ct ON ct.id = hrs.coat`, (error, result) => {
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
    })

    app.post('/horses', (req, res) => {
        console.log("LOG: POST on /horses");
        console.log(req);
        console.log(req.body);
        const { name } = req.body;
        if (req.body == null) {
            res.status(206).send("missing information");
        }
        else {
            pgsql.query(`INSERT INTO ${horses_table_name} (horse_name) VALUES ($1)`, [name], (error, results) => {
                if (error) {
                    throw error
                }
                else {
                    console.log(results);
                    res.status(201).send(`Horse added ${name}`)
                }
            })
        }
    })

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