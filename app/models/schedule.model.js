module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("schedule", {
    weekday: {
      type: Sequelize.TINYINT(1)
    },
    morningBegin: {
      type: Sequelize.TIME
    },
    morningEnd: {
      type: Sequelize.TIME
    },
    afternoonBegin: {
      type: Sequelize.TIME
    },
    afternoonEnd: {
      type: Sequelize.TIME
    }
  });

  return Schedule;
};
