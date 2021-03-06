module.exports = (app) => {
  const albums = require('../controllers/album.controller.js');
  var router = require('express').Router();

  // Create a new album
  router.post('/', albums.create);

  // Retrieve all albums
  router.get('/', albums.findAll);

  // Retrieve a single album with id
  router.get('/:id', albums.findOne);

  // Update a album with id
  router.put('/:id', albums.update);

  // Delete a album with id
  router.delete('/:id', albums.delete);

  // Delete all albums
  router.delete('/', albums.deleteAll);

  //Find albums with artist
  router.get('/artist/:artistId', albums.findByArtist);

  app.use('/api/albums', router);
};
