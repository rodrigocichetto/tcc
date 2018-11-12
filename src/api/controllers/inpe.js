const configs = require('../config/configs');
const request = require('request');
const xml2js = require('xml2js');

const parser = new xml2js.Parser({ explicitArray: false });

module.exports = (app) => {

    let Controller = {
        listaCidades: (req, res, next) => {
            request({
                uri: `${configs.EXTERNAL.INPE}/listaCidades${req.params.city?`?city=${req.params.city}`:''}`,
                encoding: 'latin1'
            }, (error, response, body) => {
                try {
                    parser.parseString(body, (err, data) => {
                        res.status(response.statusCode).send(data.cidades);
                    });
                } catch (e) {
                    res.status(500).send();
                }
            });
        },
        cidade: (req, res, next) => {
            request({
                uri: `${configs.EXTERNAL.INPE}/cidade/${req.params.cityCode}/estendida.xml`,
                encoding: 'latin1'
            }, (error, response, body) => {
                try {
                    parser.parseString(body, (err, data) => {
                        res.status(response.statusCode).send(data);
                    });
                } catch (e) {
                    res.status(500).send();
                }
            });
        },
        cidadePrevisao: (req, res, next) => {
            request({
                uri: `${configs.EXTERNAL.INPE}/cidade/${req.params.cityCode}/previsao.xml`,
                encoding: 'latin1'
            }, (error, response, body) => {
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