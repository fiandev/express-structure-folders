const env = require("../../helpers/env");

module.exports = {
  development: {
    username: env("DB_USERNAME", "root"),
    password: env("DB_PASSWORD", ""),
    database: env("DB_NAME", env("APP_NAME")),
    host: env("DB_HOST", "localhost"),
  },
  production: {
    /*
     * default connection schema
     * mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
     */
    connection: "",
  },
};
