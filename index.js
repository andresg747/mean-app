'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mean', (err,res) => {
	if(err){
		throw err;
	}else{
		console.log("La base de datos se ha conectado correctamente.");
		app.listen(port, function(){
			console.log("La magia ocurre por el puerto: " + port);
		})
	}
}); 