/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : serviceType.model.js
 * Description    : Spécification de la table "serviceType" et de ses champs.                 
 */

module.exports = (sequelize, Sequelize) => {
  const ServiceType = sequelize.define("serviceType", {
    name: {
      type: Sequelize.STRING
    }
  });

  return ServiceType;
};
