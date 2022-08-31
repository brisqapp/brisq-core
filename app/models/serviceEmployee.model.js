module.exports = (sequelize, Sequelize, db) => {
    const ServiceEmployee = sequelize.define('ServiceEmployee', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        employeeId: {
            type: Sequelize.INTEGER,
            references: {
                model: db.employee,
                key: 'id'
            }
        },
        serviceTypeId: {
            type: Sequelize.INTEGER,
            references: {
                model: db.serviceType,
                key: 'id'
            }
        },
        duration: {
            type: Sequelize.STRING
        }
    });

    return ServiceEmployee;
};
