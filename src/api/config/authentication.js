const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
// const mongoose = require('mongoose');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: 'minhaChaveSecreta'
}

module.exports = {
    get auth() {

        let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
            if (jwt_payload) {
                next(null, jwt_payload);
            }
        });

        passport.use(strategy);

        return {
            initialize: function () {
                return passport.initialize();
            },
            get authenticate() {
                return passport.authenticate('jwt', { session: false });
            }
        }
    },
    login: (callback) => {
        let token = jwt.sign('irrigacao-api', jwtOptions.secretOrKey);
        callback({token});
    }
}