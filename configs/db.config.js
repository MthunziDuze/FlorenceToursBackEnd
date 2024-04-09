module.exports = {
  HOST: "127.0.0.1",
  PORT: 3306,
  USER: "florence",
  PASSWORD: "florence",
  DB: "florencedb",
  dialect: "mysql",
  pool: {
    max: 6,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
