const mongoose = require("mongoose");
const env = require("../helpers/env");
const { development, production } = require("./config");
const { host, username, database, password } = development;

const connection =
  env("APP_ENV", "production") === "production"
    ? mongoose.connect(production.connection)
    : mongoose.connect(`mongodb://${host}:${port}/${database}`);

module.exports = connection;
