const { writeFileSync, readFileSync } = require("fs");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const shell = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        console.error({ error, stderr });
        return reject();
      }
      return resolve();
    });
  });
};

const shellSync = (text) => {
  text.split("\n").map((command) => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) console.error({ error, stderr });
      if (stdout) console.log(stdout);
    });
  });
};

const createSlug = (text = "") => {
  return text
    .toString()
    .replace(/(\`|\'|\")/, "")
    .split(" ")
    .join("-")
    .split("_")
    .join("-");
};

const transformPackage = (pathfile, toTransfrom) => {
  let data = JSON.parse(readFileSync(pathfile, "utf8"));
  let isModuleExp = /dependencies/g;

  for (let key in toTransfrom) {
    if (toTransfrom[key] === null) delete data[key];
    if (isModuleExp.test(key)) {
      for (let moduleKey in toTransfrom[key]) {
        let modules = toTransfrom[key];
        if (modules[moduleKey] === null) delete data[key][moduleKey];
        if (modules[moduleKey] === "latest")
          modules[moduleKey] = data[key][moduleKey];
        if (modules[moduleKey] !== "latest" && modules[moduleKey] !== null)
          data[key][moduleKey] = modules[moduleKey];
      }
    }
  }

  writeFileSync(pathfile, JSON.stringify(data, null, 2));
};

const jsonParse = (psthfile) => {
  return JSON.parse(pathfile);
};

const type = (any) => {
  if (Array.isArray(any)) return "array";
  else return typeof any;
};

const exportStaticFile = (destination, files) => {
  if (type(files) !== "string" && type(files) !== "array")
    throw new TypeError(
      `typeof argument 1 must be array or string '${type(files)}' given !`
    );
  if (type(files) === "string") files = [files];

  for (let filename of files) {
    let pathfile = path.join(__dirname, `../../static/files/${filename}.txt`);
    let dest = path.join(destination, `/.${filename}`);

    if (fs.existsSync(pathfile)) fs.copyFileSync(pathfile, dest);
    else throw new Error(`file ${pathfile} is not exist !`);
  }
};

module.exports = {
  shell,
  shellSync,
  createSlug,
  transformPackage,
  jsonParse,
  exportStaticFile,
};
