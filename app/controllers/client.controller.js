/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : client.controller.js
 * Description    : Contient les requêtes faites à la BDD concernant la table "client".             
 */

const db = require("../models");
const Client = db.client;
const Op = db.Sequelize.Op;

// Fonction permettant de créer un "client"
exports.create = async (req, res) => {
  
  // Vérification de si tous les champs nécessaires sont présents dans la requête
  if (!req.body.firstName ||
    !req.body.lastName ||
    !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Récupération des informations présentes dans la requête
  const client = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  // Sauvegarde du client dans la BDD
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

// Fonction permettant de récupérer tous les "client"
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

// Fonction permettant de trouver un client à l'aide de son id
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

// Fonction permettant d'update un client à l'aide d'un id
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

// Fonction permettant de supprimer un "client" à l'aide d'un id
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