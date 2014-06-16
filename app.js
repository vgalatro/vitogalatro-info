var express = require('express'),
  stylus = require('stylus'),
  nib = require('nib');
var app = express();

/* Set-up app */

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware({ 
  src: __dirname + '/public', 
  compile: compile
}));
app.use(express.static(__dirname + '/public'));

/* Start app */
app.listen(3000);

/* global variables */

var title_suffix = ' | Vito Galatro - Web Application Developer';

app.get('/', function(req, res) {
  res.render('index.jade', {
    title : 'Home' + title_suffix
  });
});

app.get('/about', function(req, res) {
  res.render('about.jade', {
    title : 'About' + title_suffix
  });
});

app.get('/portfolio', function(req, res) {
  res.render('portfolio.jade', {
    title : 'Portfolio' + title_suffix
  });	
});

app.get('/contact', function(req, res) {
  res.render('contact.jade', {
    title : 'Contact' + title_suffix
  });	
});
