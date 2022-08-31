module.exports = (sequelize, Sequelize) => {
  const Reservation = sequelize.define("reservation", {
    startHour: {
      type: Sequelize.TIME
    },
    date: {
      type: Sequelize.DATE
    }
  });

  return Reservation;
};
