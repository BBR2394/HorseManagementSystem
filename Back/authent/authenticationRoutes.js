var express = require('express');

var authentRouter =  express.Router();

authentRouter.route('/signup')
.post((req, res) => {
    console.log("toto")
    console.log(req.body)
    console.log("dans la route d'authent")
    res.json(req.body);
});

module.exports = authentRouter;