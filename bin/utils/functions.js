const { writeFileSync, readFileSync } = require("fs");
const { exec } = require("child_process");

const shell = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(`exec error: ${err}`);
        return reject();
      }
      return resolve();
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

module.exports = {
  shell,
  createSlug,
  transformPackage,
};