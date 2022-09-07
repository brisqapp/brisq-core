/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : employee.controller.js
 * Description    : Contient les requêtes faites à la BDD concernant la table "employee".             
 */

const db = require("../models");
const Employee = db.employee;
const Schedule = db.schedule;
const ServiceEmploye = db.serviceEmployee;
const Op = db.Sequelize.Op;

// Fonction permettant de créer un "employee"
exports.create = async (req, res) => {

  idCompany = req.tokenId;

  // Vérification de si tous les champs nécessaires sont présents dans la requête
  if (!req.body.name) {
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

  const employees = await Employee.findAll({
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
        id: e.id,
        name: e.name,
        serviceName: e.ServiceEmployees.map(se => {
          return se.serviceType.name
        })
      }
    })    
    
  }
  
  res.status(200).send(data);
};

exports.findOne = async (req, res) => {
  const id = req.params.id;

  const employe = await Employee.findOne({
    where: 
    { 
      id: id
    },
    include : [{
      model: db.serviceEmployee,
      require: true,
      include:[{
        model: db.serviceType,
        require: true
      }]
    }, {
      model: db.schedule,
      require: true
    }]
  });

  const data = {
    id: employe.id,
    name: employe.name,
    schedules: employe.schedules.map(schedule => {
      return {
        weekday: schedule.weekday,
        morningBegin: schedule.morningBegin.slice(0, 5),
        morningEnd: schedule.morningEnd.slice(0, 5),
        afternoonBegin: schedule.afternoonBegin.slice(0, 5),
        afternoonEnd: schedule.afternoonEnd.slice(0, 5),
      }
    }),
    services: employe.ServiceEmployees.map(se => {
      return {
        id: se.id,
        idService: se.serviceType.id,
        name: se.serviceType.name,
        duration: se.duration
      }
    })
  }
  
  res.status(200).send(data);
};

exports.update = async (req, res) => {
  const id = req.params.id;


  const employe = await Employee.findOne({
    where: 
    { 
      id: id
    },
    include : [{
      model: db.serviceEmployee,
      require: true
    }, {
      model: db.schedule,
      require: true
    }]
  });


  if(employe == null){
    res.status(401).send({
      message: "Employee not found"
    });
  }

  //Modification des informations de l'employé
  employe.name = req.body.name;

  const servicesEmployeId = [];

  console.log(req.body.services);
  //Modification des services de l'employé
  for(const service of req.body.services){
    if(service.id < 0){
      //Insertion dans ServiceEmploye
      const serviceEmployee = await ServiceEmploye.create({
        employeeId: id,
        serviceTypeId: service.serviceId,
        duration: service.duration
      });
      servicesEmployeId.push(serviceEmployee.id);
    } else {
      //Modification de service employe
      await ServiceEmploye.update({duration: service.duration}, {
        where: {
          id: service.id
        }
      });
      const serviceEmployee = await ServiceEmploye.findOne({
        where: {
          id: service.id
        }
      });
      servicesEmployeId.push(serviceEmployee.id);
    }
  }

  existingServicesEmploye = await ServiceEmploye.findAll({
    where: {employeeId: id}
  })
  //Supprime les services employés non utilisé
  for(const existingServiceEmploye of existingServicesEmploye){
    if(!servicesEmployeId.includes(existingServiceEmploye.id)){
      ServiceEmploye.destroy({
        where: {id: existingServiceEmploye.id}
      })
    }
  }

  //Modification des horaires de l'employé
  for(const schedule of req.body.schedules){
    const searchSchedule = await Schedule.findOne({
      where: {
        weekday: schedule.weekday,
        employeeId: id
      }
    })
    if(searchSchedule == null){
      await Schedule.create({
        ...schedule,
        employeeId: id
      });  
    } else {
      await Schedule.update({
        ...schedule,
        employeeId: id
      }, {
        where: {id: searchSchedule.id}
      })
    }
  }

  employe.save();

  res.status(200).send({
    message: "Enregistrement effectué"
  })
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