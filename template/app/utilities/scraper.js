const axios = require("axios");
const path = require("path");
const env = require("./env");

const scraper = async ({ baseurl, path }) => {
  let url = new URL(path, baseurl).toString();
  let response = axios.get(url);
  
  return response;
};

module.exports = scraper;