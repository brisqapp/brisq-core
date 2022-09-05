/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : companyType.model.js
 * Description    : Spécification de la table "companyType" et de ses champs.                 
 */

module.exports = (sequelize, Sequelize) => {
  const CompanyType = sequelize.define("companyType", {
    name: {
      type: Sequelize.STRING
    }
  });

  return CompanyType;
};
