//toto
const passport = require('passport');
const { Strategy } = require('passport-local');

module.exports = function localStrategy() {
    passport.use(new Strategy(
        {
            username: 'username',
            mdp: 'password'
        }, (username, password, done) => {
            //here we check inside the db
            const user = {
                username, password
            };
            done(null, user)
        }
    ));
};