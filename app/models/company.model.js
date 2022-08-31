module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("company", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    companyName: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    postalCode: {
      type: Sequelize.INTEGER(4)
    },
    city: {
      type: Sequelize.STRING
    },

  });

  return Company;
};
