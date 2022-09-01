const db = require("../models");
const ServiceEmployee = db.ServiceEmployee;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.employeeId ||
    !req.body.serviceTypeId ||
    !req.body.duration) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const ServiceEmployee = {
    employeeId: req.body.employeeId,
    serviceTypeId: req.body.serviceTypeId,
    duration: req.body.duration
  };

  ServiceEmployee.create(ServiceEmployee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ServiceEmployee."
      });
    });
};

exports.findAll = (req, res) => {

  ServiceEmployee.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ServiceEmployees."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  ServiceEmployee.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving ServiceEmployee with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  ServiceEmployee.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ServiceEmployee was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update ServiceEmployee with id=${id}. Maybe ServiceEmployee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating ServiceEmployee with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  ServiceEmployee.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "ServiceEmployee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete ServiceEmployee with id=${id}. Maybe ServiceEmployee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete ServiceEmployee with id=" + id
      });
    });
};