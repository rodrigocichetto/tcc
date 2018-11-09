const authentication = require('../config/authentication');
const configs = require('../config/configs');
const mqtt = require('mqtt');
const request = require('request');
const xml2js = require('xml2js');

const parser = new xml2js.Parser({explicitArray : false});

module.exports = (app) => {

	const User = app.models.users;

	let Controller = {
		healthCheck: (req, res) => {

			let client = mqtt.connect(configs.MQTT);
			let response = {
				version: configs.VERSION,
				date: new Date(),
				unip_aps_broker: '',
				inpe: ''
			}
			client.on('connect', () => {
				response.unip_aps_broker = 'on';
				client.end();
			});
			client.on('error', () => {
				response.unip_aps_broker = 'error';
				client.end();
			});	
			client.on('offline', () => {
				response.unip_aps_broker = 'off';
				client.end();
			});			
			client.on('end', () => {
				request(`${configs.EXTERNAL.INPE}/capitais/condicoesAtuais.xml`, (err, resp, body) => {
					response.inpe = 'off';
					if (!err) {
						response.inpe = 'on';
					}
					res.status(200).send(response);
				});
			});

		},
		create: (req, res) => {
			let u = authentication.decode(req.headers.authorization).user;
			User.update({ _id: u._id }, {
				$push: {
					irrigations: req.body
				}
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
		update: (req, res) => {
			User.update({ 'irrigations._id': req.body._id }, {
				$set: {
					'irrigations.$': req.body
				}
			})
				.exec()
				.then(response => {
					const io = require('../socket').getIo();
					io.emit('irrigation:updated', req.body);
					if (response.ok === 1) {
						res.status(200).send();
					} else {
						res.status(400).send();
					}
				});
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
		delete: (req, res) => {
			User.update({ 'irrigations._id': req.param('id') }, {
				$pull: {
					irrigations: {
						'_id': req.param('id')
					}
				}
			})
				.exec()
				.then(response => {
					// const io = require('../socket').getIo();
					// io.emit('irrigation:updated', req.body);
					if (response.ok === 1) {
						res.status(200).send();
					} else {
						res.status(400).send();
					}
				});
		},
		controla: (req, res) => {
			if (req.params.estado == 'on' || req.params.estado == 'off') {

				let u = authentication.decode(req.headers.authorization).user;

				User.find({_id: u._id}, ['-password'], { sort: { name: 1 } })
                .exec()
                .then(user => {

					request(`${configs.EXTERNAL.INPE}/cidade/${user[0].city}/previsao.xml`, (error, response, body) => {
						try {
							parser.parseString(body, (err, data) => {
	
								if (!['nv', 'cm', 'pt'].filter((el) => el == data.cidade.previsao[1].tempo).length) {
									let client = mqtt.connect(configs.MQTT);
									client.on('connect', () => {
										client.subscribe(`topic/status/irrigation/${configs.APS_GROUP}`);
										client.publish('topic/control/irrigation', `G:${configs.APS_GROUP},S:${(req.params.estado == 'on') ? 1 : 0}`);
										client.on('message', (topic, payload) => {
											let message = [topic, payload].join(": ").split(': ')[1];
											res.status(200).send({
												topic,
												message,
												cidade: data.cidade
											});
											client.end();
										});
									});
									client.on('error', () => {
										res.status(500).send();
										client.end();
									});	
									client.on('offline', () => {
										res.status(500).send();
										client.end();
									});	
								} else {
									res.status(200).send({cidade: data.cidade});
								}
	
	
							});
						} catch (e) {
							res.status(500).send();
						}
					});

                });

			} else {
				res.send(400);
			}
		},
		verifica: (req, res) => {
			let client = mqtt.connect(configs.MQTT);
			client.on('connect', () => {
				client.subscribe(`topic/status/irrigation/${configs.APS_GROUP}`);
				client.publish('topic/control/irrigation', `G:${configs.APS_GROUP}`);
				client.on('message', (topic, payload) => {
					let message = [topic, payload].join(": ").split(': ')[1];
					res.status(200).send({
						topic,
						message
					});
					client.end();
				});
			});
			client.on('error', () => {
				res.status(500).send();
				client.end();
			});	
			client.on('offline', () => {
				res.status(500).send();
				client.end();
			});	
		}
	}

	return Controller;
}