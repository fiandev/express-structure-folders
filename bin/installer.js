#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { resolve, join, basename, parse } = require("path");
const { copySync, existsSync, emptyDirSync, moveSync } = require("fs-extra");
const { readdirSync } = require("fs");
const { green, yellow, red, cyan } = require("colors");
const { createSlug, shell, transformPackage } = require("./utils/functions");

const argv = yargs(process.argv).argv;
const input = argv._[2];
const isUseES6 = argv.es6;

const project_name = createSlug(input);
const path_project = join(process.cwd(), project_name);

const static_files = join(__dirname, "../static");
const dest = resolve(path_project);
const template = join(__dirname, "../template");
const env_example = join(process.cwd(), ".env.example");
const path_env = join(process.cwd(), ".env");
const path_package_file = join(dest, "package.json");

const main = async () => {
  emptyDirSync(path_project);
  copySync(template, dest);
  
  /* copying static files */
  readdirSync(static_files).map(function(filename){
    copySync(join(static_files, filename), join(dest, `/.${parse(filename).name}`));
  });
  
  transformPackage(path_package_file, {
    name: project_name
  });
  
  if (isUseES6) {
    transformPackage(path_package_file, {
      type: "module"
    });
    
    console.log(`compiling files to ${ cyan("es6 syntax") } ...`);
    
    await shell(`cjs-to-es6 ${dest}`);
  }
  
  
  console.log(`express app created at ${ green(dest) }`);
  console.log(`please run:\n\n   ${ cyan("cd") } ${ input }\n   ${ cyan("npm") } install\n   ${ cyan("npm") } run dev\n`);
};

main();