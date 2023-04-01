const Controller = require("../cores/Controller");

class ExampleController extends Controller {
  index() {
    let { res } = this;
    let data = {
      message: "hello express.js"
    };
    
    return res.render("./pages/welcome.ejs", {
      data: data
    });
  }
}

module.exports = ExampleController;
