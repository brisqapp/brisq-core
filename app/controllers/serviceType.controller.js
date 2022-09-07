/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : serviceType.controller.js
 * Description    : Contient les requêtes faites à la BDD concernant la table "serviceType".             
 */

const db = require("../models");
const ServiceType = db.serviceType;
const Op = db.Sequelize.Op;

// Fonction permettant de créer un "serviceType"
exports.create = async (req, res) => {
  
  // Vérification de si tous les champs nécessaires sont présents dans la requête
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Récupération des informations présentes dans la requête pour le "serviceType"
  const serviceType = {
    name: req.body.name
  };

  // Sauvegarde de "serviceType" dans la BDD
  ServiceType.create(serviceType)
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

// Fonction permettant de récupérer tous les "serviceType"
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

// Fonction permettant de trouver un "serviceType" à l'aide de son id
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

// Fonction permettant d'update un "serviceType" à l'aide d'un id
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

// Fonction permettant de supprimer un "serviceType" à l'aide d'un id
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