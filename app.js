'use strict'
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//router
app.use(require('./router'));

//view engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

//public folder
app.use(express.static('public'));

app.listen(3001, function() {
	console.log('server listening on post 3001')
});
