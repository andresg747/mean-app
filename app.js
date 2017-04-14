'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Routes
var user_routes = require('./routes/user')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Headers HTTP

// Base Urls
app.use('/api', user_routes);
app.use('/api/*', function(req,res){
	res.status(200).send({
		message: 'Chupalo Maduro'
	});
});
app.use('/*', function(req,res){
	res.status(404).send();
});

module.exports = app;