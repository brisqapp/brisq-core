const db = require("../models");
const ServiceType = db.ServiceType;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const ServiceType = {
    name: req.body.name
  };

  ServiceType.create(ServiceType)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ServiceType."
      });
    });
};

exports.findAll = (req, res) => {

  ServiceType.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ServiceTypes."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  ServiceType.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving ServiceType with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  ServiceType.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ServiceType was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ServiceType with id=${id}. Maybe ServiceType was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating ServiceType with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  ServiceType.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ServiceType was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete ServiceType with id=${id}. Maybe ServiceType was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ServiceType with id=" + id
      });
    });
};