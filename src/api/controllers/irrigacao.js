const authentication = require('../config/authentication');
const configs = require('../config/configs');

module.exports = (app) => {

	const User = app.models.users;

	let Controller = {
		healthCheck: (req, res) => {
			res.status(200).send({
				version: configs.VERSION,
				date: new Date()
			})
		},
		create: (req, res) => {
			let u = authentication.decode(req.headers.authorization).user;
			User.update({ _id: u._id }, {
				$push: {
					irrigations: req.body
				}
			})
				.exec()
				.then(res => {
					if (res.n === 1) {
						res.status(200).send();
					}
				});
		},
		update: (req, res) => {
			
		},
		listMe: (req, res) => {
			let u = authentication.decode(req.headers.authorization).user;
			User.find({ _id: u._id }, ['irrigations'], { sort: { name: 1 } })
				.exec()
				.then(user => {
					res.send(user.map(u => u.irrigations)[0]);
				});
		},
		listAll: (req, res) => {
			User.find({}, ['irrigations'], { sort: { name: 1 } })
				.exec()
				.then(users => {
					res.send(users.map(u => u.irrigations).reduce((p, n) => p.concat(n)));
				});
		},
	}

	return Controller;
}