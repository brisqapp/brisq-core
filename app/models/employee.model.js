/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : employee.model.js
 * Description    : Spécification de la table "employee" et de ses champs.                 
 */

module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    name: {
      type: Sequelize.STRING
    }
  });

  return Employee;
};
