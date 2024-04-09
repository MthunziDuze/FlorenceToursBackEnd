module.exports = (sequelize, Sequelize) => {
  const Location = sequelize.define("location", {
    country: {
      type: Sequelize.STRING,
    },
    province: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    placename: {
      type: Sequelize.STRING,
    },
  });
  return Location;
};
