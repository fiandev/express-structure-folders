#!/usr/bin/env node

const { resolve, join, basename, parse } = require("path");
const { copySync, existsSync, emptyDirSync, moveSync } = require("fs-extra");
const { readdirSync } = require("fs");

const createSlug = (text = "") => {
  return text
    .toString()
    .replace(/(\`|\'|\")/, "")
    .split(" ")
    .join("-")
    .split("_")
    .join("-");
};

const project_name = createSlug(process.argv[2]);
const path_project = join(process.cwd(), project_name);

const static_files = join(__dirname, "../static");
const dest = resolve(path_project);
const template = join(__dirname, "../template");
const env_example = join(process.cwd(), ".env.example");
const path_env = join(process.cwd(), ".env");

const main = () => {
  emptyDirSync(path_project);
  copySync(template, dest);

  /* copying static files */
  readdirSync(static_files).map(function (filename) {
    copySync(
      join(static_files, filename),
      join(dest, `/.${parse(filename).name}`)
    );
  });
  console.log(`express app created at ${dest}`);
};

main();
