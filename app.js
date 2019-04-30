var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var moment = require('moment-timezone')
const cors = require('cors');

// default router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');

// new added user's router
var initiativeRouter = require('./routes/initiative');
var restapiRouter = require('./routes/restapi/initiative');

// user function
var tmr = require('./javascripts/mytimer');
var lgldap = require('./javascripts/lgeldap');

var app = express();

moment.tz.setDefault("Asiz/Seoul");

// view engine setup
// use internal parameters (variables)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// use Middleware
app.use(cors({origin : 'http://collab.lge.com', optionsSuccessStatus : 200, credentials : true,  })); // cors settings..
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set Router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/initiative', initiativeRouter);
app.use('/restapi/initiative/', restapiRouter); // for rest api function


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
