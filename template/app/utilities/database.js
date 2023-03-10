const mysql = require("mysql2");
const env = require("./env");

const connection = mysql.createConnection({
  host: env("DB_HOST", "localhost"),
  user: env("DB_USERNAME", "root"),
  password: env("DB_PASSWORD", "root"),
  database: env("DB_NAME", env("APP_NAME")),
  port: env("DB_PORT", 3306)
});

connection.connect(function(err){
  if (err) console.error(`database connection error !\nmessage : ${err.message}`);
  else console.log('connected as id ' + connection.threadId);
});

module.exports = {
  connection
};