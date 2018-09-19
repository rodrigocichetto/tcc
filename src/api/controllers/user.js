var authentication = require('../config/authentication');

module.exports = (app) => {

    let Controller = {
        login: (req, res) => {
            authentication.login((result) => {
                if (result) {
                    res.status(200).send(result);
                } else {
                    res.status(401).send({
                        err: 401,
                        message: 'AUTH_ERR'
                    });
                }
            })
        },
    }

    return Controller;
}