/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : reservation.model.js
 * Description    : Spécification de la table "reservation" et de ses champs.                 
 */

module.exports = (sequelize, Sequelize) => {
  const Reservation = sequelize.define("reservation", {
    startHour: {
      type: Sequelize.TIME
    },
    date: {
      type: Sequelize.DATEONLY
    }
  });

  return Reservation;
};
