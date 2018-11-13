const CryptoJS = require('crypto-js');
const CONFIGS = require('../config/configs');

module.exports = (app) => {
    const User = app.models.users;

    User.find({}, [], { sort: { name: 1 } })
        .exec()
        .then(users => {

            if (!users.length) {

                new User({
                    name: 'Demonstração',
                    username: 'demo',
                    password: CryptoJS.AES.encrypt('demo', CONFIGS.KEY_ENCRYPT).toString(),
                    mail: 'demo@demo.com',
                    city: {
                        id: 586,
                        nome: "Araraquara",
                        uf: "SP" 
                    }
                }).save();

            }

        });

}