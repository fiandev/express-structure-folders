#!/usr/bin/env node

const { resolve, join } = require("path");
const { copySync, pathExists, emptyDirSync } = require("fs-extra");


const createSlug = (text = "") => {
  return text.toString().replace(/(\`|\'|\")/, "").split(" ").join("-").split("_").join("-");
};

const project_name = createSlug(process.argv[2]);
const path_project = join(process.cwd(), project_name);

const dest = resolve(path_project);
const template = join(__dirname, "../template");
const env_example = join(process.cwd(), ".env.example");
const path_env = join(process.cwd(), ".env");

const main = () => {
  emptyDirSync(path_project);
  copySync(template, dest);
  if (pathExists(env_example)) moveSync(env_example, path_env);
};

main();