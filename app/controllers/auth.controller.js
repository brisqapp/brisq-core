const { USER } = require("../config/db.config");
const db = require("../models");
const Company = db.company;
const CompanyType = db.companyType;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// login
exports.login = async (req, res) => {
  // Validate request
  if (!req.body.email ||
    !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const company = await Company.findOne({
    where: {email: req.body.email}
  });

  if(company == null){
    res.status(403).send({
        message: "User or password incorrect."
      });
      return;
  }
  console.log(company);

  const validPassword = await bcrypt.compare(req.body.password, company.password);
  console.log(validPassword, req.body.password);

  if(validPassword){
    res.status(200).send({
        token: jwt.sign(company.id, process.env.TOKEN_SECRET, {}),
        user: company
    });
  }else {
    res.status(403).send({
        message: "User or password incorrect."
      });
  }
};
