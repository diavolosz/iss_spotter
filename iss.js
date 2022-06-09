



const request = require("request");

const fetchMyIP = function(callback) {

  request("https://a11pi.ipify.org/?format=json", (error, response, body) => {

    if (error) {
      callback(error);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

module.exports = { fetchMyIP };