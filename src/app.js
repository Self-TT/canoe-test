require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {initiateListeners} = require("./handlers/duplicate-handler");

initiateListeners();

var routes = require('./routes/routes');


var companyApiRouter = require('./routes/api/company');
var fundManagerApiRouter = require('./routes/api/fund-manager');
var fundApiRouter = require('./routes/api/fund');
var investmentApiRouter = require('./routes/api/investment');

var app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/company', companyApiRouter);
app.use('/api/manager', fundManagerApiRouter);
app.use('/api/fund', fundApiRouter);
app.use('/api/investment', investmentApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
