require("dotenv").config();

/*
 *  @param {String} env_key
 *  @param {String} default_value
 *  @return {String}
 */
module.exports = (env_key, default_value = "") => {
  let value =
    typeof process.env[env_key] !== "undefined"
      ? process.env[env_key]
      : default_value;
  return value.toLowerCase();
};
