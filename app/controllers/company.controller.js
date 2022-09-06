/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : company.controller.js
 * Description    : Contient les requêtes faites à la BDD concernant la table "company".             
 */

const db = require("../models");
const Company = db.company;
const CompanyType = db.companyType;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Fonction permettant de créer une "company"
exports.create = async (req, res) => {

  // Vérification de si tous les champs nécessaires sont présents dans la requête
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

  // Génération d'un sel pour le hashage du mot de passe
  const salt = await bcrypt.genSalt(10);

  // Récupération des informations présentes dans la requête
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

  // Sauvegarde de la "company" dans la BDD
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

// Fonction permettant de récupérer toutes les "company"
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

// Fonction permettant de trouver une "company" à l'aide de son id
exports.findOne = (req, res) => {

  // Récupération de l'id à partir du token de connexion
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

// Fonction permettant d'update une "company" à l'aide d'un id
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

// Fonction permettant de supprimer une "company" à l'aide d'un id
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

// Fonction permettant de récupérer tous les détails d'une "company"
exports.getCompanyDetails = async (req, res) => {

const idCompany = req.body.id;

// Récupérer les informations d'une company
const company = await Company.findByPk(idCompany);

// récupérer toutes les informations des employés d'une entreprise
const employees = await db.employee.findAll({
  where: {companyId: idCompany},
  include : 
  [{
      model: db.schedule,
      required: true,
  },
  {
      model: db.serviceEmployee,
      required: true,
      include:
      [{
        model: db.reservation,
        required: true
      },
      {
        model: db.serviceType,
        required: true
      }
    ]
  }]
});

// parsing des données récupérées précèdement
  const data = {
    company: company.companyName,
    employees: employees.map(e => {
      return {
        id: e.id,
        name : e.name,
        schedule: e.schedules,
        services: e.ServiceEmployees.map(se => {
          return se.serviceType
        }),
        appointments: e.ServiceEmployees.map(s => {
          const duration = s.duration
          return s.reservations.map(r => {
            const endDate = new Date(new Date(r.date + " " + r.startHour).getTime() + duration*60000);
            return {
              title: "Réservé",
              startDate: r.date + " " + r.startHour,
              endDate: r.date + " " + endDate.getHours() + ":" + endDate.getMinutes() + ":" + endDate.getSeconds(),
              id: r.id
            }
          })
        })
      }
    })
  }

  res.status(200).send(data);
}
