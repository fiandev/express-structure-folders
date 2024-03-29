const { isProduction } = require("../helpers/functions");
const { cleanUrl } = require("../helpers/formatter");

class Controller {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.time = new Date().toLocaleString();
    next();
  }

  /**
   * Success Response
   * @param {JSON} data
   * @param {String} message
   * @param {Number} statusCode
   */
  response({
    data = null,
    page_title = null,
    code = 200,
    message = "success",
  }) {
    const { res, time } = this;
    res.status(code).json({
      code: code,
      message: message,
      page_title: page_title,
      url: this.getFullUrl(),
      data: data,
      server_time: time,
    });
  }

  /**
   * Failed Response
   * @param {JSON} data
   * @param {String} message
   * @param {Number} statusCode
   */
  error({ code = 500, message = "failed", status = "" }) {
    const { res, time } = this;

    res.status(code).json({
      code: code,
      status: "failed",
      message: isProduction() ? "server error!" : message,
      server_time: time,
    });
  }

  getBaseUrl() {
    const { req } = this;
    return cleanUrl(req.protocol + "://" + req.get("host"));
  }

  getFullUrl() {
    const { req } = this;
    return cleanUrl(req.protocol + "://" + req.get("host") + req.originalUrl);
  }
}

module.exports = Controller;
