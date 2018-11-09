const express = require('express');
const router = express.Router();

const auth = require('../config/authentication').auth;

module.exports = (app) => {
    var Controller = app.controllers.irrigacao;

    router.get('/', Controller.healthCheck);
    router.get('/all', auth.authenticate, Controller.listMe);
    router.post('/new', auth.authenticate, Controller.create);
    router.put('/update', auth.authenticate, Controller.update);
    router.delete('/delete/:id', auth.authenticate, Controller.delete);
    router.put('/controla/:estado', auth.authenticate, Controller.controla);
    router.get('/verifica', auth.authenticate, Controller.verifica);


    app.use('/irrigacao', router);
}
