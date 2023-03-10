const Controller = require("../cores/Controller");

class ExampleController extends Controller {
  index () {
    let { res } = this;
    
    return res.render("./pages/welcome.ejs");
  }
}

module.exports =ExampleController;