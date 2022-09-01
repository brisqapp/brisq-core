module.exports = (sequelize, Sequelize, db) => {
    const ServiceEmployee = sequelize.define('ServiceEmployee', {
        duration: {
            type: Sequelize.INTEGER
        }
    });

    return ServiceEmployee;
};
