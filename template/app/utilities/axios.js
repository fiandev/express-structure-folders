const _axios = require("axios");
const path = require("path");
const env = require("./env");

/*
 *  @param {Object} destructuring
 *  @destructuring {String} baseurl
 *  @destructuring {String} method
 *  @destructuring {Object} data
 *  @return {Object} _axios
 */
const axios = async ({ baseurl, path, method = "get", data = {} }) => {
  /* validation */
  if (!(data instanceof FormData))
    throw `parameter 'data' must be instance class FormDatà`;

  let url = new URL(path, baseurl).toString();
  let response = await _axios(url, {
    method: method,
    data: data,
  });

  return response;
};

module.exports = axios;
