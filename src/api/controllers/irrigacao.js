const configs = require('../config/configs');

module.exports = (app) => {

	let Controller = {
		healthCheck: (req, res) => {
			res.status(200).send({
				version: configs.VERSION,
				date: new Date()
			})
		},
	}

	return Controller;
}