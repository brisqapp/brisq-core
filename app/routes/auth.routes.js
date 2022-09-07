/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : auth.routes.js
 * Description    : Contient les routes pour la partie authentification.
 */

module.exports = app => {
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  /**
 * @api {post} auth/ Authentification of the user and creation of his token
 * @apiName login
 * @apiGroup Auth
 * 
 * @apiDescription Check if the user exists in the DB and check if the password is correct
 *
 * @apiParam {String} email Email of the company.
 * @apiParam {String} password    Password of the company.
 *
 * @apiSuccess  {string} token   Token for the connexion
 * @apiSuccess  {table} user  Contain all the informations of the company
 * 
 * @apiErrorExample If some fields are missing
 *    {
 *        "message": "Content can not be empty!"
 *    }
 * @apiErrorExample If email or password are incorrect
 *    {
 *        "message": "User or password incorrect."
 *    }
 */
  router.post("/", auth.login);

  app.use('/api/auth', router);
};
