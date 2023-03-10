const Express = require("express");
const log = require("../middlewares/log");

/*
 * example require controller
 */
const ExampleController = require("../controllers/ExampleController");

const router = Express.Router();

class Router {
    static exception ({ PATH_VIEWS }) {
      const { readFileSync } = require("fs");
      const path = require("path");
      
      if (!PATH_VIEWS) {
        return this.get("*", (req, res, next) => {
          res.send({
            code: 404,
            success: false,
            status: "failed"
          });
        });
      } else {
        return [
          this.get("*", (req, res, next) => {
            try {
              res.render("./exceptions/404.ejs");
            } catch (e) {
              res.send(`404 Not Found`);
              console.log(e);
            }
          }),
          this.get("/api", (req, res, next) => {
            res.send({
              code: 404,
              success: false,
              status: "failed"
            });
          })
        ];
      }
    }
    
    static init() {
        return [
          this.get("/", (req, res, next) => new ExampleController(req, res, next).index())
        ];
    }
    
    static get(...args) {
        // add middleware log
        args.push(log);
        return router.get(...args);
    }
    
    static post(...args) {
        // add middleware log
        args.push(log);
        return router.get(...args);
    }
    
    static delete(...args) {
        // add middleware log
        args.push(log);
        return router.get(...args);
    }
    
    static put(...args) {
        // add middleware log
        args.push(log);
        return router.get(...args);
    }
    
}

module.exports = Router;
