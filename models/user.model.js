module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    logintype: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    userType: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
