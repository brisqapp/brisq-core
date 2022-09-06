/**
 * Projet brisq
 * Auteurs        : Olivier Tissot-Daguette, Théo Mirabile
 * Nom du fichier : index.js
 * Description    : Contient la connexion à la BDD distante et les associations 
 * entre les différentes tables à l'aide de l'ORM Sequelize.                  
 */

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// Connexion à la base de données avec les informations contenues dans le .env
const connection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.connection = connection;

// Association entre company et companyType
db.company = require("./company.model.js")(connection, Sequelize);
db.companyType = require("./companyType.model.js")(connection, Sequelize);
db.companyType.hasMany(db.company, { foreignKey: 'companyTypeId', sourceKey: 'id' });
db.company.belongsTo(db.companyType);

// Association entre company et employee
db.employee = require("./employee.model.js")(connection, Sequelize);
db.company.hasMany(db.employee, { foreignKey: 'companyId', sourceKey: 'id' });
db.employee.belongsTo(db.company);

// Association entre schedule et employee
db.schedule = require("./schedule.model.js")(connection, Sequelize);
db.employee.hasMany(db.schedule, { foreignKey: 'employeeId', sourceKey: 'id' });
db.schedule.belongsTo(db.employee);

db.serviceType = require("./serviceType.model.js")(connection, Sequelize);
db.serviceEmployee = require("./serviceEmployee.model.js")(connection, Sequelize, db);

// Association entre client et reservation
db.client = require("./client.model.js")(connection, Sequelize);
db.reservation = require("./reservation.model.js")(connection, Sequelize);
db.client.hasMany(db.reservation, { foreignKey: 'clientId', sourceKey: 'id' });
db.reservation.belongsTo(db.client);

// Association entre serviceEmployee et reservation
db.serviceEmployee.hasMany(db.reservation, { foreignKey: 'serviceEmployeeId', sourceKey: 'id' });
db.reservation.belongsTo(db.serviceEmployee, { foreignKey: 'serviceEmployeeId' });

// Association entre employee et serviceEmployee
db.employee.hasMany(db.serviceEmployee, { foreignKey: 'employeeId', sourceKey: 'id' });
db.serviceEmployee.belongsTo(db.employee);

// Association entre serviceType et serviceEmployee
db.serviceType.hasMany(db.serviceEmployee, { foreignKey: 'serviceTypeId', sourceKey: 'id' });
db.serviceEmployee.belongsTo(db.serviceType);

module.exports = db;
