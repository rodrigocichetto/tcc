const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const load = require('express-load');
const cors = require('cors');
// swagger
const os = require('os');
const ifaces = os.networkInterfaces();
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load(`${__dirname}/api-docs.yaml`);
// database
require('./config/database')(
  process.env.DB_DATABASE && process.env.DB_IPV4_ADDRESS ?
    'mongodb://' + process.env.DB_IPV4_ADDRESS + ':27017/' + process.env.DB_DATABASE :
    'mongodb://localhost:27017/tcc');
const initData = require('./config/init-data');

var auth = require('./config/authentication').auth;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(auth.initialize())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

load('models')
  .then('controllers')
  .then('routes')
  .into(app);

// swagger
swaggerDocument.host = `${(ifaces.eth0) ? ifaces.eth0[0].address : 'localhost'}:${process.env.PORT || 3000}`;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// scripts
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io-client/dist/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');

  res.status(err.status || 500).send();
});

// DUMP Initial
if (process.env.DUMP_DEMO === 'true') {
  initData(app);
}

module.exports = app;
