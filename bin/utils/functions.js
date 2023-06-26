const { writeFileSync, readFileSync } = require("fs");
const { exec } = require("child_process");

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
  text.split("\n").map(command => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) console.error({ error, stderr });
      if (stdout) console.log(stdout);
    });
  });
};

const createSlug = (text = "") => {
  return text.toString().replace(/(\`|\'|\")/, "").split(" ").join("-").split("_").join("-");
};

const transformPackage = (pathfile, toTransfrom) => {
  let data = JSON.parse(readFileSync(pathfile, "utf8"));
  
  for (let key in toTransfrom) {
    data[key] = toTransfrom[key];
  }
  
  writeFileSync(pathfile, JSON.stringify(data, null, 2));
};

const jsonParse = (psthfile) => {
  return JSON.parse(pathfile);
};

module.exports = {
  shell,
  shellSync,
  createSlug,
  transformPackage,
  jsonParse,
};