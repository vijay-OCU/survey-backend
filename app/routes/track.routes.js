module.exports = app => {
  const tracks = require("../controllers/track.controller.js");
  var router = require("express").Router();

  // Create a new track for a album
  router.post("/:albumId/tracks/", tracks.create);

  // Retrieve all tracks for a album
  router.get("/:albumId/tracks/", tracks.findAll);

  // Retrieve all published tracks for a album
  //router.get("/:albumId/tracks/published", tracks.findAllPublished);

  // Retrieve a single track with id
  router.get("/:albumId/tracks/:id", tracks.findOne);

  // Update a track with id
  router.put("/:albumId/tracks/:id", tracks.update);

  // Delete a track with id
  router.delete("/:albumId/tracks/:id", tracks.delete);
  
  // Delete all tracks
  router.delete("/:albumId/tracks/:id", tracks.deleteAll);
  app.use('/api/albums', router);
};