const { USER } = require("../config/db.config");
const db = require("../models");
const Company = db.company;
const CompanyType = db.companyType;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// login
exports.login = (req, res) => {
  // Validate request
  if (!req.body.name ||
    !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const company = await Company.findOne({
    where: {name: req.body.name}
  });

  if(company == null){
    res.status(403).send({
        message:
          err.message || "User or password incorrect."
      });
  }

  const validPassword = await bcrypt.compare(company.password, req.body.password);

  if(validPassword){
    res.status(200).send({
        token: jwt.sign(company.id, process.env.SECRET_TOKEN, {expiresIn: '308384739403817285'})
    });
  }else {
    res.status(403).send({
        message:
          err.message || "User or password incorrect."
      });
  }
};