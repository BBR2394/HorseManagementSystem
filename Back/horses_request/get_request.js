module.exports = function(app, pgsql) {
    
    const horses_table_name = "horses"

    app.get('/horses', (req, res) => {
        console.log("LOG: GET on /horses");
        const params = {
            name: req.query.name
        }
        if (params.name != null) {
            console.log("il y a un nom dans la requete")
            pgsql.query(`SELECT * FROM ${horses_table_name} WHERE name='${params.name}'`, (error, result) => {
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
        }
        else {
            pgsql.query(`SELECT * FROM ${horses_table_name}`, (error, result) => {
                console.log(result.rows);
                if (error) {
                    debug("LOG-1 : error when query on /horses");
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
            pgsql.query(`INSERT INTO ${horses_table_name} (name) VALUES ($1)`, [name], (error, results) => {
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
            pgsql.query(`DELETE FROM ${horses_table_name} WHERE name = $1`, [params.name], (error, results) => {
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