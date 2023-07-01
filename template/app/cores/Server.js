const device = require("express-device");
const consolidate = require("consolidate");
const Express = require("express");

const Router = require("./Router");

const app = new Express();

class Server {
  /*
   * @param {String} PORT
   * @return {Void}
   */
  constructor({ PORT = 3000, PATH_VIEWS = "", VIEW_ENGINES = [] }) {
    this.PORT = PORT;
    this.PATH_VIEWS = PATH_VIEWS;
    this.VIEW_ENGINES = VIEW_ENGINES;

    this.init();
    this.set_engines();
  }

  /*
   * @return {Void}
   */
  set_engines() {
    const { VIEW_ENGINES, PATH_VIEWS } = this;

    /* views path */
    if (PATH_VIEWS) app.set("views", PATH_VIEWS);

    /* default engine */
    const default_engines = ["pug", "ejs"];

    app.set("view engine", "ejs");

    if (!VIEW_ENGINES) return this;

    for (let key of VIEW_ENGINES) {
      if (!Object.keys(consolidate).includes(key))
        throw new Error(`view engine '${key}' not found!`);
      if (!default_engines.includes(key)) {
        try {
          app.engine(key, consolidate[key]);
        } catch (e) {
          throw new Error(
            `please run npm install ${key}, before using this view engine`
          );
        }
      }
    }
  }

  /*
   * @return {Void}
   */
  init() {
    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      next();
    });
    app.use(Express.json());
    app.use(device.capture());

    // register router
    app.use("/", Router.init());
    // exceptions routes
    app.use("*", Router.exception(this));
    app.use(Express.static(__dirname + "/public"));
    app.use(Express.urlencoded({ extended: true }));
  }

  /*
   * @param {Object} destructuring
   * @destructuring {Number} timeout
   * @return {Void}
   */
  start({ timeout }) {
    let thread = app.listen(this.PORT, () => {
      console.log(`Server running on port ${this.PORT}`);

      if (timeout) {
        setTimeout(function () {
          thread.close();
        }, timeout);
      }
    });
  }
}

module.exports = Server;
