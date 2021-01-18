const passport = require('passport');
require('../strategies/local.strategy.js');


module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null,  user);
    });

    passport.deserializeUser((userId, done) => {
        //here we cfind user in db by id that return a user and so ...
        done(null,  userId);
    });

};