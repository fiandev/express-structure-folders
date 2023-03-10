const env = require("../utilities/env");

module.exports = {
  isProduction,
  getSlug,
  getCurrency
};

function isProduction () {
  return env("APP_ENV", "development") === "production";
}

function getSlug (link) {
  if (!link) return;
  let decodeURL = new URL(link);
  
  return decodeURL.pathname;
}


function getCurrency (str) {
  const formats = [
    {
      regex: /^RP/,
      name: "IDR"
    },
    {
      regex: /^\$/,
      name: "USD"
    }
  ];
  let price = str.toUpperCase();
  
  for (let format of formats) {
    if (format.regex.test(price)) return format.name;
  }
  return "UNKNOWN"; // default currency
}