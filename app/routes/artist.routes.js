module.exports = app => {
    const artists = require("../controllers/artist.controller.js");
    var router = require("express").Router();
    
    // Create a new artist
    router.post("/", artists.create);
    
    // Retrieve all artists
    router.get("/", artists.findAll);
    
    // Retrieve a single artist with id
    router.get("/:id", artists.findOne);
    
    // Update a artist with id
    router.put("/:id", artists.update);
    
    // Delete a artist with id
    router.delete("/:id", artists.delete);
  
    // Delete all artists
    router.delete("/", artists.deleteAll);
    app.use('/api/artists', router);
  };