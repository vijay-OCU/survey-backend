const db = require("../models");
const Track = db.tracks;
const Op = db.Sequelize.Op;

// Create and Save a new Track
exports.create = (req, res) => {
  
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Track
  const track = {
    albumId: req.params.albumId,
    title: req.body.title,
    length: req.body.length,
    //published: req.body.published ? req.body.published : false
  };

  // Save Track in the database
  Track.create(track)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Track."
      });
    });
};

// Retrieve all Tracks from the database.
exports.findAll = (req, res) => {
  const albumId = req.params.albumId;
  console.log(albumId);
  var condition = albumId ? {albumId: {[Op.like]: `%${albumId}%`}} : null;
  Track.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tracks."
      });
    });
};

// Find a single Track with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Track.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Track with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Track with id=" + id
      });
    });
};

// Update a Track by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Track.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Track was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Track with id=${id}. Maybe Track was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Track with id=" + id
      });
    });
};

// Delete a Track with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Track.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Track was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Track with id=${id}. Maybe Track was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Track with id=" + id
      });
    });
};

// Delete all Tracks from the database.
exports.deleteAll = (req, res) => {
  Track.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tracks were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tracks."
      });
    });
};

/*// Find all published Tracks
exports.findAllPublished = (req, res) => {
  const trackId = req.query.trackId;

  Track.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tracks."
      });
    });
};*/