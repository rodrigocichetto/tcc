var express = require('express');
var router = express.Router();

module.exports = (app) => {

  router.get('/', (req, res, next) => {
    res.redirect('/api-docs')
    // res.render('index', { title: 'Express' });
  });

  router.get('/monitor', (req, res, next) => {
    res.render('monitor', { 
      irrigators: [
        {
          _id: 'irineu',
          status: true,
          name: "1",
          city: 587
        },
        {
          _id: 'irineu2',
          status: false,
          name: "1",
          cep: '123456',
          address: 'Avenida teste 123',
          city: 587
        },
      ] 
    });
  });

  app.use('', router);

}
