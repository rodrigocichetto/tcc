const express = require('express');
const router = express.Router();

const auth = require('../config/authentication').auth;

module.exports = (app) => {
    var Controller = app.controllers.irrigacao;

    router.get('/', Controller.healthCheck);
    router.put('/controla/:estado', auth.authenticate, Controller.controla);
    router.get('/verifica', auth.authenticate, Controller.verifica);


    app.use('/irrigacao', router);
}
