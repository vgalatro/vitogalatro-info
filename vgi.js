exports.runApp = function () {

  /* Express App */
  var express = require('express'),
    stylus = require('stylus'),
    nib = require('nib');
  var app = express();
  
  /* Init Stylus */
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
  
  /* Variables */
  var title_suffix = ' | Vito Galatro - Web Application Developer';
  
  /* Routes */
  app.get('/', function(req, res) {
    res.render('index.jade', {
      title : 'Portfolio' + title_suffix
    });
  });
  
  app.get('/about', function(req, res) {
    res.render('about.jade', {
      title : 'About' + title_suffix
    });
  });
}