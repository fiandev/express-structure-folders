const fs = require("fs");

const log = (req) => {
  const time = new Date().toLocaleString();
  let text = `[${time}] => [${req.method}] ${req.originalUrl}`;
  
  const pathFile = path.join(process.cwd(), "./log.txt");
  let header = `========== ${ time } ==========`;
  let footer = header.split("").map(v => "=").join("");
  
  const content = `${ header }\n${ text }\n${ footer }\n`;
  if (!fs.existsSync(pathFile)) fs.writeFileSync(pathFile, content);
  else fs.appendFileSync(pathFile, content);
  
  console.log(text);
};

module.exports = log;
