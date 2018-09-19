const express = require('express');
const router = express.Router();

module.exports = (app) => {
    var Controller = app.controllers.user;

    router.post('/login', Controller.login);

    app.use('/user', router);
}
