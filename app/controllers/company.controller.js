const db = require("../models");
const Company = db.company;
const CompanyType = db.companyType;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");

// Create and Save a new Company
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name ||
    !req.body.address ||
    !req.body.postalCode ||
    !req.body.city ||
    !req.body.password ||
    !req.body.companyTypeId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const salt = await bcrypt.genSalt(10);

  // Create a Company
  const company = {
    name: req.body.name,
    address: req.body.address,
    postalCode: req.body.postalCode,
    city: req.body.city,
    password: await bcrypt.hash(req.body.password, salt),
    companyTypeId: req.body.companyTypeId
  };

  // Save Company in the database
  Company.create(company)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    });
};

// Retrieve all Companies from the database.
exports.findAll = (req, res) => {

  Company.findAll({ include: CompanyType })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companies."
      });
    });
};

// Find a single Company with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Company.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Company with id=" + id
      });
    });
};

// Update a Company by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Company.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Company was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Company with id=" + id
      });
    });
};

// Delete a Company with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Company.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Company was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Company with id=${id}. Maybe Company was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Company with id=" + id
      });
    });
};