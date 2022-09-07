/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : client.model.js
 * Description    : Spécification de la table "client" et de ses champs.                 
 */

module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  });

  return Client;
};
