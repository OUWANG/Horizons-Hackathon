var path = require('path');
var mongoose = require('mongoose');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
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

app.use('/', routes);

app.listen(process.env.PORT || 3000);
