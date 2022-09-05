/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : serviceEmployee.model.js
 * Description    : Spécification de la table "serviceEmployee" et de ses champs.                 
 */

module.exports = (sequelize, Sequelize, db) => {
    const ServiceEmployee = sequelize.define('ServiceEmployee', {
        duration: {
            type: Sequelize.INTEGER
        }
    });

    return ServiceEmployee;
};
