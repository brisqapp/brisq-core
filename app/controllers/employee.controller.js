const db = require("../models");
const Employee = db.employee;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {

  const idCompany = req.tokenId;

  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const employee = {
    name: req.body.name,
    companyId: idCompany
  };

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

exports.findAll = async (req, res) => {

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

  console.log(employe);

  const data = {
    id: employe.id,
    name: employe.name,
    schedules: employe.schedules,
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