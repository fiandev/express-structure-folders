#!/usr/bin/env node

const pkg = require("../package.json");
const yargs = require("yargs/yargs");
const { resolve, join, basename, parse } = require("path");
const { copySync, existsSync, emptyDirSync, moveSync } = require("fs-extra");
const { readdirSync } = require("fs");
const { green, yellow, red, cyan } = require("colors");
const {
  createSlug,
  shell,
  transformPackage,
  jsonParse,
  exportStaticFile,
} = require("./utils/functions");

/* ==========
   parsing command line arguments
   
   =========== */
const argv = yargs(process.argv).argv;
const input = argv._[2];
const isUseES6 = argv.es6;
const isUseMongodb = argv.mongodb || argv.mongoose;
const isAutoInstallDependencies = argv.auto;

/* ==========
   resolving project path
   
   =========== */
const project_name = createSlug(input);
const path_project = join(process.cwd(), project_name);

const static_files = join(__dirname, "../static");
const dest = resolve(path_project);
const template = join(__dirname, "../template");
const env_example = join(process.cwd(), ".env.example");
const path_env = join(process.cwd(), ".env");
const path_package_file = join(dest, "package.json");

/*
 * main functiok
 * @return {Void}
 */
const main = async () => {
  let DBconfig = join(__dirname, `../static/config/${ isUseMongodb ? "mongoose" : "sequelize" }`);
  let AppDBConfig = join(dest, "/app/database");
  
  emptyDirSync(path_project);
  copySync(DBconfig, AppDBConfig);
  copySync(template, dest, { 
    filter: function (src, dest) {
      let exp = /node_modules/g;
      
      return !exp.test(src);
    }
  });

  /* copying static files */
  exportStaticFile(dest, ["gitignore", "env"]);
  transformPackage(path_package_file, {
    type: "module",
    _moduleAliases: isUseES6 ? "default" : null,
    dependencies: {
      axios: "^1.3.3",
      cheerio: "^1.0.0-rc.12",
      consolidate: "^0.16.0",
      dotenv: "^16.0.3",
      ejs: "^3.1.8",
      express: "^4.18.2",
      "express-device": "^0.4.2",
      mysql2: isUseMongodb ? null : "latest",
      mongoose: isUseMongodb ? "latest" : null,
      pug: "^3.0.2",
      sequelize: isUseMongodb ? null : "latest",
    },
    devDependencies: {
      nodemon: "latest",
      "sequelize-cli": isUseMongodb ? null : "latest",
      "module-alias": isUseES6 ? null : "latest",
    },
  });
  
  if (!isUseMongodb) {
    let DBconfig = join(__dirname, "../static/config/sequelize");
    let AppDBConfig = join(dest, "/app/database");
    
    exportStaticFile(dest, ["sequelizerc"]);
  }
  
  if (isUseES6) {
    console.log(`compiling files to ${cyan("es6 syntax")} ...`);
    await shell(`cjs-to-es6 ${dest}`);
  }

  if (isAutoInstallDependencies) {
    console.log(`downloading required ${cyan("dependencies")}`);
    await shell(`cd ${dest} && npm install`);
  }

  console.log(
    `${yellow("[!]")} express app created at ${green(
      `./${dest.split("/").pop()}`
    )}`
  );
  let text = `
    ${cyan("cd")} ${input}
    ${!isAutoInstallDependencies ? `${cyan("npm")} install` : ""}
    ${cyan("npm")} run dev
`;
  text = text
    .split("\n")
    .filter((v) => v.trim() !== "")
    .join("\n");
  console.log(`${cyan("[!]")} please run:\n\n${text}\n`);
  console.log(`${cyan("[!]")} ${pkg.name + " " + yellow("v" + pkg.version)}`);
};

main();
