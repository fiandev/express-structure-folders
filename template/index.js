const { resolve } = require("path");
const Server = require("./app/cores/Server");
const env = require("./app/utilities/env");

const server = new Server({
  PORT: env("SERVER_PORT", 3000),
  VIEW_ENGINES: ["ejs"],
  PATH_VIEWS: resolve("./app/views"),
});

server.start();
