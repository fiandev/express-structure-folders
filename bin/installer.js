#!/usr/bin/env node

const { resolve, join } = require("path");
const { copySync, pathExists } = require("fs-extra");

const dest = resolve(process.cwd());
const template = join(__dirname, "../template");
const env_example = join(process.cwd(), ".env.example");
const path_env = join(process.cwd(), ".env");

const main = () => {
  copySync(template, dest);
  if (pathExists(env_example)) moveSync(env_example, path_env);
};

main();