const express = require('express');
const router = express.Router();

const auth = require('../config/authentication').auth;

module.exports = (app) => {
    var Controller = app.controllers.user;

    router.post('/auth', Controller.auth);
    router.post('/login', Controller.login);
    router.post('/new', Controller.create);
    router.get('/all', Controller.listAll);
    router.get('/me', auth.authenticate, Controller.me);

    app.use('/user', router);
}