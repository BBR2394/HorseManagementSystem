var express = require('express');

var authentRouter =  express.Router();

    //here we are going to create the user
    authentRouter.route('/signup')
        .post((req, res) => {
            console.log("toto")
            console.log(req.body)
            console.log("dans la route d'authent")
            //here we have to create user if doesnt exist

            //login was added by passpppoprt
            req.login(req.body, () => {
                console.log("-> redirection")
                console.log(req.body)
                res.redirect('/authent/profile');
            });
        });

    authentRouter.route('/profile')
        .get((req, res) => {
            console.log("profile page")
            //res.send("<p>route de profil</p>");
            console.log(req.user)
            res.json(req.user);
        })

    authentRouter.route('/login')
        .post((req, res) => {
            console.log("login")
            res.send("<p>route de login</p>");
        })

module.exports = authentRouter;