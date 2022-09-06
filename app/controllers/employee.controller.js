/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : employee.controller.js
 * Description    : Contient les requêtes faites à la BDD concernant la table "employee".             
 */

const db = require("../models");
const Employee = db.employee;
const Op = db.Sequelize.Op;

// Fonction permettant de créer un "employee"
exports.create = async (req, res) => {

  // Vérification de si tous les champs nécessaires sont présents dans la requête
  if (!req.body.name ||
    !req.body.companyId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Récupération des informations présentes dans la requête
  const employee = {
    name: req.body.name,
    companyId: idCompany
  };

  // Sauvegarde de "employee" dans la BDD
  Employee.create(employee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee."
      });
    });
};

// Fonction permettant de récupérer tous les "employee"
exports.findAll = (req, res) => {

  const idCompany = req.tokenId;

  const employees = Employee.findAll({
    where: 
    { 
      companyId: idCompany
    },
    include : [{
      model: db.serviceEmployee,
      require: true,
      include:[{
        model: db.serviceType,
        require: true
      }]
    }]
  });

  const data = {
    employees: employees.map(e => {
      return {
        name: e.name,
        serviceName: e.ServiceEmployees.map(se => {
          return se.serviceType.name
        })
      }
    })
    
    
  }
  
  res.status(200).send(data);
};

// Fonction permettant de trouver un "employee" à l'aide de son id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Employee.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Employee with id=" + id
      });
    });
};

// Fonction permettant d'update un "employee" à l'aide d'un id
exports.update = (req, res) => {
  const id = req.params.id;

  Employee.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id
      });
    });
};

// Fonction permettant de supprimer un "employee" à l'aide d'un id
exports.delete = (req, res) => {
  const id = req.params.id;

  Employee.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id
      });
    });
};