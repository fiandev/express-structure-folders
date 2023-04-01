const Express = require("express");
const { join } = require("path");
const Middlewares = require("require-all")({
  dirname: join(__dirname, '../middlewares')
});

const log = require("../middlewares/log");
const router = Express.Router();

class Router {
  static routes = [];

  /*
   *  @return {Array}
   */
  static init() {
    const { routes } = this;
    const routers = [];

    const setRouter = (requestMethod, route) => {
      const {
        name,
        view,
        controller,
        controllerMethod,
        middlewares,
      } = route;
      
      let params = [];
      const func = this[requestMethod];
      middlewares
        .map((key) => {
          if (!Middlewares[key])
            throw `middleware ${key} not exist, please create the middleware at ~/app/middlewares`;
          else return Middlewares[key];
        })
        .filter((v) => v !== undefined)
        .map((middleware) => params.push(middleware));
      routers.push(
        func(view, (req, res, next) => new controller(req, res, next)[controllerMethod]())
      );
    };

    for (let route of routes) {
      const { requestMethod } = route;
      if (Array.isArray(route.requestMethod))
        route.requestMethod.map((requestMethod) =>
          setRouter(requestMethod, route)
        );
      else setRouter(route.requestMethod, route);
    }
    
    console.log(routers);
    return routers;
  }

  static add(requestMethod, view, controller, controllerMethod, options = {}) {
    const { middlewares, name } = options;
    this.routes.push({
      name: name,
      view: view,
      requestMethod: requestMethod,
      controller: controller,
      controllerMethod: controllerMethod,
      middlewares: middlewares,
    });
  }

  static get(...args) {
    args.push(log);
    return router.get(...args);
  }

  static post(...args) {
    args.push(log);
    return router.get(...args);
  }

  static delete(...args) {
    args.push(log);
    return router.get(...args);
  }

  static put(...args) {
    args.push(log);
    return router.get(...args);
  }
}

class Route {
  static get(view, controller, controllerMethod, options = {}) {
    return Router.add("get", view, controller, controllerMethod, options);
  }
  static post(view, controller, controllerMethod, options = {}) {
    return Router.add("post", view, controller, controllerMethod, options);
  }
  static delete(view, controller, controllerMethod, options = {}) {
    return Router.add("delete", view, controller, controllerMethod, options);
  }
  static put(view, controller, controllerMethod, options = {}) {
    return Router.add("put", view, controller, controllerMethod, options);
  }
  static patch(view, controller, controllerMethod, options = {}) {
    return Router.add("patch", view, controller, controllerMethod, options);
  }
  
  static init () {
    return Router;
  }
}

module.exports = Route;