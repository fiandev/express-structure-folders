const env = require("../utilities/env");

module.exports = {
  isProduction,
  getSlug,
  getCurrency,
};

/*
 *  @return {String}
 */
function isProduction() {
  return env("APP_ENV", "development") === "production";
}

/*
 *  @param {String} link
 *  @return {String}
 */
function getSlug(link) {
  if (!link) return;
  let decodeURL = new URL(link);

  return decodeURL.pathname;
}

/*
 *  @param {String} str
 *  @param {String} default_currency
 *  @return {String}
 */
function getCurrency(str, default_currency = "unknown") {
  const formats = [
    {
      regex: /^RP/,
      name: "IDR",
    },
    {
      regex: /^\$/,
      name: "USD",
    },
  ];
  let price = str.toUpperCase();

  for (let format of formats) {
    if (format.regex.test(price)) return format.name.toUpperCase();
  }

  return default_currency.toUpperCase(); // default currency
}
