const db = require("../models");
const Client = db.client;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.firstName ||
    !req.body.lastName ||
    !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const client = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  Client.create(client)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Client."
      });
    });
};

exports.findAll = (req, res) => {

  Client.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clients."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Client.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Client with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Client.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Client was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Client with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Client.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Client was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Client with id=" + id
      });
    });
};