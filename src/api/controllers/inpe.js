const configs = require('../config/configs');
const request = require('request');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

module.exports = (app) => {

    let Controller = {
        listaCidades: (req, res, next) => {
            request(`${configs.EXTERNAL.INPE}/listaCidades${req.params.city?`?city=${req.params.city}`:''}`, (error, response, body) => {
                try {
                    parser.parseString(body, (err, data) => {
                        res.status(response.statusCode).send(data);
                    });
                } catch (e) {
                    res.status(500).send();
                }
            });
        },
        cidade: (req, res, next) => {
            request(`${configs.EXTERNAL.INPE}/cidade/${req.params.cityCode}/estendida.xml`, (error, response, body) => {
                try {
                    parser.parseString(body, (err, data) => {
                        res.status(response.statusCode).send(data);
                    });
                } catch (e) {
                    res.status(500).send();
                }
            });
        }
    }

    return Controller;
}