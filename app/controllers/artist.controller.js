const db = require("../models");
const Artist = db.artists;
const Album = db.albums;
const albums = require('../controllers/album.controller.js');
const { findAll } = require("./track.controller");
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a artist
  const artist = {
    name: req.body.name,
    gender: req.body.gender,
    location: req.body.location,
    count: req.body.count,
    //artistId: req.body.artistId
    /*
    write code to search for atist ID
    */

    //published: req.body.published ? req.body.published : false
  };

  // Save artist in the database
  Artist.create(artist)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the artist."
      });
    });
};

// Retrieve all artists from the database.
module.exports.findAll = ( req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Artist.findAll({
    where:  condition ,
    include: [ { model: Album, as: 'albums' } ]
})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving artists."
      });
    });
};


// Find a single Artist with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Artist.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find artist with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving artist with id=" + id
      });
    });
};

// Update a artist by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Artist.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Artist was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Artist with id=${id}. Maybe Artist was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating artist with id=" + id
      });
    });
};

// Delete a artist with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Artist.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Artist was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Artist with id=${id}. Maybe Artist was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Artist with id=" + id
      });
    });
};

// Delete all Albums from the database.
exports.deleteAll = (req, res) => {
  Artist.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Albums were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all artists."
      });
    });
};

// Find all published artists
/*exports.findAllPublished = (req, res) => {
  Artist.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving artists."
      });
    });
};*/