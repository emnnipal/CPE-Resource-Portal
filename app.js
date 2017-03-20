var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const methodOverride = require('method-override');
const restify = require('express-restify-mongoose');
const router = express.Router();


var index = require('./routes/index');
var subjects = require('./routes/subjects');
var auth = require('./routes/auth');
var portal = require('./routes/portal');

var MongoURI = 'mongodb://cpeportal:cpeportal@ds145118.mlab.com:45118/cpeportal'


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
      "maxAge": 86400000,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/user');
var Subject = require('./models/subjects');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect(MongoURI, function(err, res) {
    if (err) {
        console.log('Error connecting to ' + MongoURI);
    } else {
        console.log('MongoDB connected!');
    }
});

restify.serve(router, Subject);
app.use(router);

restify.serve(router, User);
app.use(router);

app.use('/', index);
app.use('/subjects', subjects);
app.use('/auth', auth);
app.use('/portal', portal);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
