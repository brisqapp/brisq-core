/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : serviceEmployee.controller.js
 * Description    : Contient les requêtes faites à la BDD concernant la table "serviceEmployee".             
 */

const db = require("../models");
const ServiceEmployee = db.serviceEmployee;
const Op = db.Sequelize.Op;

// Fonction permettant de créer un "serviceEmployee"
exports.create = async (req, res) => {

  // Vérification de si tous les champs nécessaires sont présents dans la requête
  if (!req.body.employeeId ||
    !req.body.serviceTypeId ||
    !req.body.duration) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Récupération des informations présentes dans la requête pour le "serviceEmployee"
  const serviceEmployee = {
    employeeId: req.body.employeeId,
    serviceTypeId: req.body.serviceTypeId,
    duration: req.body.duration
  };

  // Sauvegarde de "serviceEmployee" dans la BDD
  ServiceEmployee.create(serviceEmployee)
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

// Fonction permettant de récupérer tous les "serviceEmployee"
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

// Fonction permettant de trouver un "serviceEmployee" à l'aide de son id
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

// Fonction permettant d'update un "serviceEmployee" à l'aide d'un id
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

// Fonction permettant de supprimer un "serviceEmployee" à l'aide d'un id
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