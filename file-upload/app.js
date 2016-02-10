
/**
 * Module dependencies.
 */
var express  = require('express');
var connect = require('connect');
var app      = express();
var port     = process.env.PORT || 8080;
var pointsController = require('./server/controllers/points-controller');
var rImagesController = require('./server/controllers/rimages-controller');
var rdImagesController = require('./server/controllers/rdimages-controller');


// Configuration
app.use(express.static(__dirname + '/public'));
app.use(connect.cookieParser());
app.use(connect.logger('dev'));
app.use(connect.bodyParser());

app.use(connect.json());  
app.use(connect.urlencoded());

// Routes
require('./routes/routes.js')(app);

//REST API
app.get('/api/reportsAndPoints', pointsController.list);
app.post('/api/reportsAndPoints', pointsController.create);
app.post('/api/rImages',rImagesController.create);
app.get('/api/rImages', rImagesController.list);
app.post('/api/rrImages', rImagesController.update);
app.post('/api/rdImages',rdImagesController.del);

app.listen(port);
console.log('The App runs on port ' + port);
