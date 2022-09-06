/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : companyType.controller.js
 * Description    : Contient les requêtes faites à la BDD concernant la table "companyType".             
 */

const db = require("../models");
const CompanyType = db.companyType;
const Op = db.Sequelize.Op;

// Fonction permettant de créer un "companyType"
exports.create = (req, res) => {

  // Vérification de si tous les champs nécessaires sont présents dans la requête
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Récupération des informations présentes dans la requête
  const companyType = {
    name: req.body.name
  };

  // Sauvegarde du "companyType" dans la BDD
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

// Fonction permettant de récupérer tous les "companyType"
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

// Fonction permettant de trouver un "companyType" à l'aide de son id
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

// Fonction permettant d'update un "companyType" à l'aide d'un id
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

// Fonction permettant de supprimer une "companyType" à l'aide d'un id
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
