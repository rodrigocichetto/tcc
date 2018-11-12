const authentication = require('../config/authentication');

const CryptoJS = require('crypto-js');
const CONFIGS = require('../config/configs');

module.exports = (app) => {
    const User = app.models.users;

    let Controller = {
        auth: (req, res) => {
            if (req.body.token) {
                if (authentication.authByToken(req.body.token)) {
                    res.status(200).send(req.body);
                }
                res.status(401).send({
                    err: 401,
                    message: 'AUTH_ERR'
                });
            } else {
                res.status(400).send({
                    err: 400,
                    message: 'BADREQUEST_ERR'
                });
            }
        },
        login: (req, res) => {
            authentication.login(req.body.username, req.body.password, 
                (result) => {
                    if (result) {
                        res.status(200).send(result);
                    } else {
                        res.status(401).send({
                            err: 401,
                            message: 'AUTH_ERR'
                        });
                    }
                }
            )
        },
        create: (req, res) => {
            var newUser = new User(req.body);
            newUser.password = CryptoJS.AES.encrypt(req.body.password, CONFIGS.KEY_ENCRYPT).toString();
            newUser.save((err, resp) => {
                if (err) {
                    res.status(400).end();
                    console.log(err);
                } else {
                    res.json(resp);
                }
            })
        },
        update: (req, res) => {
            let u = authentication.decode(req.headers.authorization).user;
            if (req.body.password) {
                req.body.password = CryptoJS.AES.encrypt(req.body.password, CONFIGS.KEY_ENCRYPT).toString();
            }
			User.update({ _id: u._id }, {
				$set: req.body
			})
				.exec()
				.then(response => {
					if (response.ok === 1) {
						res.status(200).send();
					} else {
						res.status(400).send();
					}
				});
		},
        listAll: (req, res) => {
            User.find({}, ['-password'], { sort: { name: 1 } })
                .exec()
                .then(users => {
                    res.json(users.map(user => {
                        return user;
                    }));
                });
        },
        me: (req, res) => {
            let u = authentication.decode(req.headers.authorization).user;
            User.find({_id: u._id}, ['-password'], { sort: { name: 1 } })
                .exec()
                .then(user => {
                    res.json(user[0]);
                });
        },
    }

    return Controller;
}