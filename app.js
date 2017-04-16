'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Routes
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');
var album_routes = require('./routes/album');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Headers HTTP

// Base Urls
app.use('/api', user_routes);
app.use('/api', artist_routes);
app.use('/api', album_routes);
app.use('/api/*', function(req,res){
	res.status(404).send({
		message: 'Nope.'
	});
});
app.use('/*', function(req,res){
	res.status(404).send({message: 'Nope.'});
});

module.exports = app;