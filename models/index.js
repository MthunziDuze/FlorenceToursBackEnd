const dbConfig = require("../configs/db.config.js");
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
db.customer = require("./customer.model.js")(sequelize, Sequelize);
db.offer = require("./offer.model.js")(sequelize, Sequelize);

db.location = require("./location.model.js")(sequelize, Sequelize);
db.activity = require("./activity.model.js")(sequelize, Sequelize);
db.vacation = require("./vacation.model.js")(sequelize, Sequelize);
db.vacationactivity = require("./vacation.activity.model.js")(
  sequelize,
  Sequelize
);

db.customer.hasMany(db.offer, { as: "offers" });
db.offer.belongsTo(db.customer, { foreignKey: "customerId", as: "customer" });

db.location.hasMany(db.vacation, { as: "vacations" });
db.vacation.belongsTo(db.location, { foreignKey: "locationId" });

db.vacation.hasMany(db.vacationactivity, { as: "activities" });
db.vacationactivity.belongsTo(db.vacation, { foreignKey: "vacationId" });

db.vacation.hasMany(db.offer, { as: "offers" });
db.offer.belongsTo(db.vacation, { foreignKey: "vacationId" });

db.activity.hasMany(db.vacationactivity, { as: "vacation_activities" });

module.exports = db;
