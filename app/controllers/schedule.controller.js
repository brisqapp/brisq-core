/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : schedule.controller.js
 * Description    : Contient les requêtes faites à la BDD concernant la table "schedule".             
 */

const db = require("../models");
const Schedule = db.schedule;
const Op = db.Sequelize.Op;

// Fonction permettant de créer un "schedule"
exports.create = async (req, res) => {
  
  // Vérification de si tous les champs nécessaires sont présents dans la requête
  if (!req.body.weekday ||
    !req.body.morningBegin ||
    !req.body.morningEnd ||
    !req.body.afternoonBegin ||
    !req.body.afternoonEnd ||
    !req.body.employeeId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Récupération des informations présentes dans la requête pour le "schedule"
  const schedule = {
    weekday: req.body.weekday,
    morningBegin: req.body.morningBegin,
    morningEnd: req.body.morningEnd,
    afternoonBegin: req.body.afternoonBegin,
    afternoonEnd: req.body.afternoonEnd,
    employeeId: req.body.employeeId
  };

  // Sauvegarde de "schedule" dans la BDD
  Schedule.create(schedule)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Schedule."
      });
    });
};

// Fonction permettant de récupérer tous les "schedule"
exports.findAll = (req, res) => {

  Schedule.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Schedules."
      });
    });
};

// Fonction permettant de trouver un "schedule" à l'aide de son id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Schedule.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Schedule with id=" + id
      });
    });
};

// Fonction permettant d'update un "schedule" à l'aide d'un id
exports.update = (req, res) => {
  const id = req.params.id;

  Schedule.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Schedule was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Schedule with id=${id}. Maybe Schedule was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Schedule with id=" + id
      });
    });
};

// Fonction permettant de supprimer un "schedule" à l'aide d'un id
exports.delete = (req, res) => {
  const id = req.params.id;

  Schedule.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Schedule was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Schedule with id=${id}. Maybe Schedule was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Schedule with id=" + id
      });
    });
};
