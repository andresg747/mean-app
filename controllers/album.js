'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getAlbum(req, res){
	var albumId = req.params.id;

	Album.findById(albumId).populate({path:'artist'}).exec((err, album) => {
		if(err)
			res.status(500).send({message: 'Error en la petición'})
		else{
			if(!album){
				res.status(404).send({message: 'Album no encontrado'})
			}
			else{
				res.status(200).send({album})
			}
		}
	});
};

function getAlbums(req, res){
	var artistId = req.params.artist;

	if(!artistId){
		// Listar todos los albums de la BDD
		var find = Album.find({}).sort({'title':-1});
	}else{
		// Listar todos los albums asociados al artista 
		var find = Album.find({artist: artistId}).sort({'year':-1});
	}

	find.populate({path: 'artist'}).exec((err, albums) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!albums){
				res.status(404).send({message: 'No existen albums.'})
			}else{
				res.status(200).send({albums})
			}
		}
	});
};

function saveAlbum(req, res){
	var album = new Album();

	var params = req.body;
	album.title = params.title;
	album.description = params.description;
	album.year = params.year;
	album.image = 'null';
	album.artist = params.artist;

	album.save((err, albumStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor.'});
		}else{
			if(!albumStored){
				res.status(404).send({message: 'No se ha podido guardar el album.'});
			}else{
				res.status(200).send({album: albumStored});
			}
		}
	});
};

function updateAlbum(req, res){
	var albumId = req.params.id;
	var update = req.body;

	Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor.'});
		}else{
			if(!albumUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el album.'});
			}else{
				res.status(200).send({album: albumUpdated});
			}
		}
	});
};

module.exports = {
	getAlbum,
	saveAlbum,
	getAlbums,
	updateAlbum
}