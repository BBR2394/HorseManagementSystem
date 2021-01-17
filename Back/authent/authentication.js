//il faut faire des routes 

//ce fichier n'est pas utilisé
module.exports = function(app, bodyParser) {

    app.post('/login', (req, res) => {
        var isConnected = false;
        console.log("LOG: POST on /login");
        console.log(req.body);

        if (isConnected) {
            res.send("<h1>Connected !</h1>");
        }
        else {
            res.status(401).send("<h1>403 unauthorized</h1>");
        }
    })
}