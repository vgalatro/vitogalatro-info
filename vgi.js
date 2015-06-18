exports.runApp = function (db) {

  /* Includes */
  var express = require('express'),
    stylus = require('stylus'),
    nib = require('nib');

  /* Define Express app */
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
  var titleSuffix = ' | Vito Galatro - Web Application Developer',
    currentRes = {},
    currentTemplate = '',
    currentTitle = '',
    currentContent = '';

  /* Routes */
  app.get('/', function(req, res) {
    currentRes = res;
    currentTemplate = 'index.jade';
    currentTitle = 'Portfolio';
    buildPage('portfolio');
  });

  app.get('/about', function(req, res) {
    currentRes = res;
    currentTemplate = 'index.jade';
    currentTitle = 'About';
    buildPage('about');
  });

  /* Finds the content for a specified page and sets the
     global currentContent var */
  function buildPage(pageName) {
    db.pages.find({'page': pageName}, function(err, pages) {
      if (err || !pages) {
        currentContent = '  p\n    Page not found';
      }
      else {
        page = pages.shift();
        currentContent = page.content;
      }
      renderPage();
    });
  }

  /* Function to render page */
  function renderPage() {
    currentRes.render(currentTemplate, {
      pageTitle : currentTitle + titleSuffix,
      title : currentTitle,
      content : currentContent
    });
  }
}
