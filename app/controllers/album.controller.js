const db = require('../models');
const Album = db.albums;
const Track = db.tracks;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  console.clear();
  console.log(req);
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  // Create a album
  const album = {
    title: req.body.title,
    language: req.body.language,
    genre: req.body.genre,
    artistId: req.body.artist,
    /*
    write code to search for atist ID
    */

    //published: req.body.published ? req.body.published : false
  };

  // Save album in the database
  Album.create(album)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the album.',
      });
    });
};

// Retrieve all albums from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  Album.findAll({ where: condition,
    include: [ { model: Track, as: 'tracks' } ] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving albums.',
      });
    });
};

// Retrieve all albums based on artist
exports.findByArtist = (req, res) => {
  const artistId = req.params.artistId;
  Album.findAll({ where: { artistId: { [Op.like]: artistId } },
    include: [ { model: Track, as: 'tracks' } ] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving albums.',
      });
    });
};

// Find a single Album with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Album.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find album with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving album with id=' + id,
      });
    });
};

// Update a album by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Album.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Album was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Album with id=${id}. Maybe Album was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating album with id=' + id,
      });
    });
};

// Delete a album with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Album.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Album was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Album with id=${id}. Maybe Album was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Album with id=' + id,
      });
    });
};

// Delete all Albums from the database.
exports.deleteAll = (req, res) => {
  Album.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Albums were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all albums.',
      });
    });
};

// Find all published albums
/*exports.findAllPublished = (req, res) => {
  Album.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving albums."
      });
    });
};*/
