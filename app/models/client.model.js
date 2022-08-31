module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  });

  return Client;
};
