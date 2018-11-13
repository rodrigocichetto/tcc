var express = require('express');
var router = express.Router();

module.exports = (app) => {
	
  const User = app.models.users;

  router.get('/', (req, res, next) => {
    res.redirect('/api-docs')
    // res.render('index', { title: 'Express' });
  });

  router.get('/monitor', (req, res, next) => {
    User.find({}, ['irrigations'], { sort: { name: 1 } })
      .exec()
      .then(users => {

        res.render('monitor', {
          title: 'Monitor',
          irrigators: users.map(u => u.irrigations).reduce((p, n) => p.concat(n))
        });

      });
  });

  app.use('', router);

}
