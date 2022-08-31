module.exports = (sequelize, Sequelize) => {
  const ServiceType = sequelize.define("serviceType", {
    name: {
      type: Sequelize.STRING
    }
  });

  return ServiceType;
};
