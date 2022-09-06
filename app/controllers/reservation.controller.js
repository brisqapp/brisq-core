/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : reservation.controller.js
 * Description    : Contient les requêtes faites à la BDD concernant la table "reservation".             
 */

const { client } = require("../models");
const db = require("../models");
const Reservation = db.reservation;
const Op = db.Sequelize.Op;

// Fonction permettant de créer une "reservation"
exports.create = async (req, res) => {
  
  // Vérification de si tous les champs nécessaires sont présents dans la requête
  if (!req.body.startHour ||
    !req.body.date ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.serviceEmployeeId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Récupération des informations présentes dans la requête pour le client
  const client = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  };

  // Sauvegarde du client dans la BDD
  const newClient = await db.client.create(client)
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Client."
      });
    });

  // Récupération des informations présentes dans la requête pour la réservation
  const reservation = {
    startHour: req.body.startHour,
    date: req.body.date,
    clientId: newClient.id,
    serviceEmployeeId: req.body.serviceEmployeeId
  };

  // Sauvegarde de "reservation" dans la BDD
  await Reservation.create(reservation)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Reservation."
      });
    });
};

// Fonction permettant de récupérer toutes les "reservation"
exports.findAll = async (req, res) => {

  // Récupération de l'id à partir du token de connexion
  const idCompany = req.tokenId;

  // Utilisation d'inner join pour récupérer toutes les informations nécessaires
  const reservations = await Reservation.findAll({
    include : 
    [{ 
      model: db.client, 
      required: true,
    },
    {
      model: db.serviceEmployee, 
      required: true,
      include: 
      [{
        model: db.employee, 
        required: true,
        where: {companyId: idCompany},
      },
      {
        model: db.serviceType, 
        required: true
      }]
    }]
  });

  // Récupération des employés de la company
  const employees = await db.employee.findAll({
    where: {companyId: idCompany}
  })

  // Parsing des données récupérées dans les requêtes pour l'envoi au front-end
  const data = {
    employees: employees.map(e => e.name),
    reservations: reservations.map(r => {
      
      // Permet de convertir nos deux champs date et heure de la BDD en un objet date pour faire un calcul
      const endDate = new Date(new Date(r.date + " " + r.startHour).getTime() + r.ServiceEmployee.duration*60000);

      return {
        title: r.ServiceEmployee.serviceType.name,
        startDate: r.date + " " + r.startHour,
        endDate: r.date + " " + endDate.getHours() + ":" + endDate.getMinutes() + ":" + endDate.getSeconds(),
        id: r.id,
        location: r.ServiceEmployee.employee.name
      }
    })
  }

  res.status(200).send(data);
};

// Fonction permettant de trouver une "reservation" à l'aide de son id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Reservation.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Reservation with id=" + id
      });
    });
};

// Fonction permettant d'update une "reservation" à l'aide d'un id
exports.update = (req, res) => {
  const id = req.params.id;

  Reservation.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Reservation was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Reservation with id=${id}. Maybe Reservation was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Reservation with id=" + id
      });
    });
};

// Fonction permettant de supprimer une "reservation" à l'aide d'un id
exports.delete = (req, res) => {
  const id = req.params.id;

  Reservation.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Reservation was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Reservation with id=${id}. Maybe Reservation was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Reservation with id=" + id
      });
    });
};