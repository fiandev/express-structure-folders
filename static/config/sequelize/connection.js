const env = require("../helpers/env");
const mysql = require("mysql2");

const ENVIRONMENT = env("APP_ENV");
const connection = mysql.createConnection(config[ENVIRONMENT]);

connection.connect(function (err) {
  if (err)
    console.error(`database connection error !\nmessage : ${err.message}`);
  else console.log("database connected as id " + connection.threadId);
});

module.exports = connection;
