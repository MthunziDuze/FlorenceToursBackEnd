module.exports = (sequelize, Sequelize) => {
  const VacationActivity = sequelize.define("vacationactivity", {
    price: {
      type: Sequelize.STRING,
    },
    ageRestriction: {
      type: Sequelize.DOUBLE,
    },
    description: {
      type: Sequelize.STRING,
    },
    startDate: {
      type: Sequelize.DATE,
    },
    endDate: {
      type: Sequelize.DATE,
    },
    vacationId: {
      type: Sequelize.INTEGER,
    },
    locationId: {
      type: Sequelize.INTEGER,
    },
  });
  return VacationActivity;
};
