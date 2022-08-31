const db = require("../models");
const CompanyType = db.companyType;
const Op = db.Sequelize.Op;

// Create and Save a new Company
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Company
  const companyType = {
    name: req.body.name
  };

  // Save Company in the database
  CompanyType.create(companyType)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company type."
      });
    });
};

// Retrieve all Companies from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  CompanyType.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving company types."
      });
    });
};

// Find a single Company type with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  CompanyType.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Company type with id=" + id
      });
    });
};

// Update a Company by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  CompanyType.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Company type was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Company type with id=${id}. Maybe Company type was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Company type with id=" + id
      });
    });
};

// Delete a Company with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  CompanyType.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Company type was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Company type with id=${id}. Maybe Company was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Company type with id=" + id
      });
    });
};

// Delete all Companies from the database.
exports.deleteAll = (req, res) => {
  CompanyType.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Company types were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all company types."
      });
    });
};
