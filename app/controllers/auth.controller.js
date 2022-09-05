/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : auth.controller.js
 * Description    : Contient les requêtes faites à la BDD concernant l'authentification.             
 */

const { USER } = require("../config/db.config");
const db = require("../models");
const Company = db.company;
const CompanyType = db.companyType;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Requête permettant de tester si la combinaison username/password est correct
exports.login = async (req, res) => {

  // Vérification de si tous les champs nécessaires sont présents dans la requête
  if (!req.body.email ||
    !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Recherche de la company à l'aide de l'adresse email
  const company = await Company.findOne({
    where: {email: req.body.email}
  });

  if(company == null){
    res.status(403).send({
        message: "User or password incorrect."
      });
      return;
  }

  // Utilisation de bcrypt pour comparer le mot de passe de la requête et celui de la BDD
  const validPassword = await bcrypt.compare(req.body.password, company.password);
  console.log(validPassword, req.body.password);

  // Si les mots de passe sont égaux renvoit un token protégé contenant l'id de la company
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
