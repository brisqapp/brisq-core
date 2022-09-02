const db = require("../models");
const Company = db.company;
const CompanyType = db.companyType;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create and Save a new Company
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.companyName ||
    !req.body.address ||
    !req.body.postalCode ||
    !req.body.city ||
    !req.body.companyTypeId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const salt = await bcrypt.genSalt(10);

  // Create a Company
  const company = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, salt),
    companyName: req.body.companyName,
    address: req.body.address,
    postalCode: req.body.postalCode,
    city: req.body.city,
    companyTypeId: req.body.companyTypeId
  };

  // Save Company in the database
  Company.create(company)
    .then(data => {
      res.send({
        company:data, 
        token: jwt.sign(data.id, process.env.TOKEN_SECRET, {})
      });
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
  const id = req.tokenId;

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
  const id = req.tokenId;

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
  const id = req.tokenId;

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