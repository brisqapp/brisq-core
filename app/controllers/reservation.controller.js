const { client } = require("../models");
const db = require("../models");
const Reservation = db.reservation;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.startHour ||
    !req.body.date ||
    !req.body.clientId ||
    !req.body.serviceEmployeeId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const reservation = {
    startHour: req.body.startHour,
    date: req.body.date,
    clientId: req.body.clientId,
    companyId: req.body.companyId
  };

  Reservation.create(reservation)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Reservation."
      });
    });
};

exports.findAll = async (req, res) => {

  const idCompany = req.tokenId;

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

  const employees = await db.employee.findAll({
    where: {companyId: idCompany}
  })

  const data = {
    employees: employees.map(e => e.name),
    reservations: reservations.map(r => {
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

