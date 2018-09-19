var express = require('express');
var router = express.Router();

// var auth = require('../config/authentication').auth;

module.exports = (app) => {
    var Controller = app.controllers.irrigacao;

    router.get('/', Controller.healthCheck);
    // router.get('/', auth.authentication ,Controller.healthCheck);

    app.use('/irrigacao', router);
}
