module.exports = (sequelize, Sequelize) => {
  const Offer = sequelize.define("offer", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.DOUBLE,
    },
    amountPaid: {
      type: Sequelize.DOUBLE,
    },
    balanceRemaining: {
      type: Sequelize.DOUBLE,
    },
    typeOfPayment: {
      type: Sequelize.STRING,
    },
    numberofPeople: {
      type: Sequelize.INTEGER,
    },
    endDate: {
      type: Sequelize.DATE,
    },
  });
  return Offer;
};
