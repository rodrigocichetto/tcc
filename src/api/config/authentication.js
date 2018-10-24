const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const mongoose = require('mongoose');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: 'minhaChaveSecreta'
}

module.exports = {
    get auth() {

        const User = mongoose.models.User;

        const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
            User.findById(jwt_payload.user._id).exec().then(user => {
                if (user) {
                    next(null, user);
                } else {
                    next(null, false);
                }
            })
        });

        passport.use(strategy);

        return {
            initialize: function () {
                return passport.initialize();
            },
            get authenticate() {
                return passport.authenticate('jwt', { session: false });
            },
        }
    },
    login: (username, password, callback) => {

        const User = mongoose.models.User;

        User.findOne({ username, password }).exec().then(user => {
            if (user) {
                user.password = undefined;
                const token = jwt.sign({ user }, jwtOptions.secretOrKey, { algorithm: 'HS256' });

                callback({ token });
            } else {
                callback(false);
            }
        })
    },
    authByToken: (token) => {
        try {
            jwt.verify(token, jwtOptions.secretOrKey);
            return true;
        } catch(e) {
            return false;
        }
    },
    decode: (token) => {
        return jwt.decode(token.split('jwt ')[1]);
    }
}