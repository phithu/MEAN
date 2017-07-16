var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./router/index');
var app = express();


app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect('mongodb://phithu:123456@ds155192.mlab.com:55192/user', {
    useMongoClient: true
})


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


app.use(index);
// app.use(users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// // error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
