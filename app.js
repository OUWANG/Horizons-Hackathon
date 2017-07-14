var path = require('path');
var mongoose = require('mongoose');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/models').User;

var auth = require('./routes/auth');
var routes = require('./routes/routes');

mongoose.connect(process.env.MONGODB_URI);

var app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  return done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    return done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({
      username: username
    })
    .then(function(user) {
      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) {
        return done(null, false);
      }
      return done(null, user);
    })
    .catch(function(err) {
      console.log(err);
      return done(err);
    });
}));

app.use('/', auth(passport));
app.use('/', routes);

app.listen(process.env.PORT || 3000);
