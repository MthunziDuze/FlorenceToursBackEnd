module.exports = (sequelize, Sequelize) => {
  const Vacation = sequelize.define("vacation", {
    price: {
      type: Sequelize.STRING,
    },
    discount: {
      type: Sequelize.DOUBLE,
    },
    description: {
      type: Sequelize.STRING,
    },
    fromDate: {
      type: Sequelize.DATE,
    },
    toDate: {
      type: Sequelize.DATE,
    },
  });
  return Vacation;
};
