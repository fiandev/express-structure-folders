#!/usr/bin/env node
const pkg = require('../package.json');
const yargs = require('yargs/yargs');
const { resolve, join, basename, parse } = require("path");
const { copySync, existsSync, emptyDirSync, moveSync } = require("fs-extra");
const { readdirSync } = require("fs");
const { green, yellow, red, cyan } = require("colors");
const { createSlug, shell, transformPackage, jsonParse } = require("./utils/functions");

const argv = yargs(process.argv).argv;
const input = argv._[2];
const isUseES6 = argv.es6;
const isAutoInstallDependencies = argv.auto;

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
    let file = join(dest, `/.${parse(filename).name}`);
    
    copySync(join(static_files, filename), file);
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
  
  if (isAutoInstallDependencies) {
    console.log(`downloading required ${ cyan("dependencies") }`);
    await shell(`cd ${ dest } && npm install`);
  }
  
  console.log(`${ yellow("[!]") } express app created at ${ green(`./${ dest.split("/").pop() }`) }`);
  let text = `
    ${ cyan("cd") } ${ input }
    ${ !isAutoInstallDependencies ? `${ cyan("npm") } install` : "" }
    ${ cyan("npm") } run dev
`;
  text = text.split("\n").filter(v => v.trim() !== "").join("\n");
  console.log(`${ cyan("[!]") } please run:\n\n${ text }\n`);
  console.log(`${ cyan("[!]") } ${ pkg.name + " " +yellow("v" + pkg.version) }`);
};

main();