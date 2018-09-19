var express = require('express');
var router = express.Router();

module.exports = (app) => {

  router.get('/', (req, res, next) => {
    res.redirect('/api-docs')
    // res.render('index', { title: 'Express' });
  });

  app.use('/', router);

}
