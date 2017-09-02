var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require("hbs");

var routes = require('./routes/index');

var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);


var PORT = 3000;

// view engine setup
//TODO: enable strict mode
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // logging incoming requests to console
app.use(bodyParser.json()); // parses request as incoming json to req.body
app.use(bodyParser.urlencoded({extended: false})); // parses request as incoming POST to req.body (PHP $_POST)
app.use(cookieParser()); //parses cookies into req.cookies

app.use("/static", express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

server.listen(PORT, function () {
    console.log('App running on port ' + PORT + "...");
});


module.exports = app;
