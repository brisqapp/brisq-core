module.exports = (sequelize, Sequelize) => {
  const CompanyType = sequelize.define("companyType", {
    name: {
      type: Sequelize.STRING
    }
  });

  return CompanyType;
};
