const express = require('express');
const router = express.Router();

module.exports = (app) => {
    var Controller = app.controllers.inpe;

    router.get('/listaCidades', Controller.listaCidades);
    router.get('/listaCidades/:city', Controller.listaCidades);
    router.get('/cidade/:cityCode', Controller.cidade);
    router.get('/cidade/previsao/:cityCode', Controller.cidadePrevisao);

    app.use('/inpe', router);
}
