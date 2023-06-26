# Documentation

## Structure Default
all files and folders generated automatically

```shell
.
├── app
│   ├── controllers
│   │   └── ExampleController.js
│   ├── cores
│   │   ├── Controller.js
│   │   ├── Router.js
│   │   └── Server.js
│   ├── database
│   │   ├── config
│   │   │   └── config.js
│   │   ├── migrations
│   │   └── models
│   │       └── index.js
│   ├── helpers
│   │   ├── formatter.js
│   │   └── functions.js
│   ├── middlewares
│   │   └── log.js
│   ├── utilities
│   │   ├── axios.js
│   │   ├── database.js
│   │   └── env.js
│   └── views
│       ├── exceptions
│       │   └── 404.ejs
│       └── pages
│           └── welcome.ejs
├── index.js
├── package-lock.json
├── package.json
└── public
```

## Routing
all routing rules on file ```~/app/cores/Router.js``` at ```init()``` static method
you can edit to customize your routes

```javascript
static init() {
  return [
    this.get("/", (req, res, next) =>
      new ExampleController(req, res, next).index()
    ),
  ];
}
```

## database
a database configuration is exist at ```~/app/database/config/config.js```
you can read official documentaion of <a href="https://sequelize.org/" alt="sequelize's page">sequelize</a> to see list of supported database