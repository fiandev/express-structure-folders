const Route = require("../cores/Route");

const ExampleController = require("../controllers/ExampleController");

Route.get("/", ExampleController, "index", {
  name: "home",
  middlewares: [],
});

module.exports = Route.init();