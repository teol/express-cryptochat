var express = require('express'),
    nunjucks  = require('nunjucks'),
    path = require('path'),
    app = express(),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    configLoader = require('yaml-config-loader');;

app.set('assets_path', __dirname + '/public');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, app.get('assets_path'))));

//Load YML configuration
var loader = new configLoader();
loader.addFile(path.join('config', 'parameters.yml'));
loader.load(function(error, config) {
  Object.keys(config).forEach(function(key){
    let value = config[key];
    app.set(key, value);
    console.log(app.get(key));
  });
});
console.log(app.get('port'));
var	routes = require('./routes/index'),
    api_routes = require('./routes/api');

app.set('port', process.env.PORT || 8000);

// Setup nunjucks templating engine
nunjucks.configure(app.get('views'), {
    autoescape: true,
    noCache: true,
    watch: true,
    express: app
});

// serve index and view partials
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  if(err.status && err.status !== 500){
    if(err.status == 404){
      res.render('404.html');
    }
    else if(err.status == 403){
      res.render('403.html');
    }
  }
  res.render('500.html');
});

// Kick start our server
app.listen(app.get('port'), function() {
    console.log('Server started on port:', app.get('port'));
    console.log('Views path:', app.get('views'));
    console.log('Assets path:', app.get('assets_path'));
});

module.exports = app;
