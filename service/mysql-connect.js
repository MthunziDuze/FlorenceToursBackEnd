const mysql = require("mysql");

const con = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "florence",
  password: "florence",
});

exports.createConnection = async () => {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE florencedb");
  });
};

exports.createDB = async () => {};
