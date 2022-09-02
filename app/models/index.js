const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
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

// Company & Company types
db.company = require("./company.model.js")(connection, Sequelize);
db.companyType = require("./companyType.model.js")(connection, Sequelize);
db.companyType.hasMany(db.company, { foreignKey: 'companyTypeId', sourceKey: 'id' });
db.company.belongsTo(db.companyType);

// Employee
db.employee = require("./employee.model.js")(connection, Sequelize);
db.company.hasMany(db.employee, { foreignKey: 'companyId', sourceKey: 'id' });
db.employee.belongsTo(db.company);

// Schedule
db.schedule = require("./schedule.model.js")(connection, Sequelize);
db.employee.hasMany(db.schedule, { foreignKey: 'employeeId', sourceKey: 'id' });
db.schedule.belongsTo(db.employee);

// ServiceType

db.serviceType = require("./serviceType.model.js")(connection, Sequelize);
db.serviceEmployee = require("./serviceEmployee.model.js")(connection, Sequelize, db);

// Client & Reservation

db.client = require("./client.model.js")(connection, Sequelize);
db.reservation = require("./reservation.model.js")(connection, Sequelize);
db.client.hasMany(db.reservation, { foreignKey: 'clientId', sourceKey: 'id' });
db.reservation.belongsTo(db.client);


db.serviceEmployee.hasMany(db.reservation, { foreignKey: 'serviceEmployeeId', sourceKey: 'id' });
db.reservation.belongsTo(db.serviceEmployee, { foreignKey: 'serviceEmployeeId' });

db.employee.hasMany(db.serviceEmployee, { foreignKey: 'employeeId', sourceKey: 'id' });
db.serviceEmployee.belongsTo(db.employee);

db.serviceType.hasMany(db.serviceEmployee, { foreignKey: 'serviceTypeId', sourceKey: 'id' });
db.serviceEmployee.belongsTo(db.serviceType);

module.exports = db;
