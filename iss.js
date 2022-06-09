



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



const fetchCoordsByIP = function(ip, callback) {

  let url = `https://api.ipbase.com/v1/json/${ip}`;

  request(url, (error, response, body) => {

    if (error) {
      callback(error);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let GeoCoor = {};
    GeoCoor.latitude = JSON.parse(body).latitude;
    GeoCoor.longitude = JSON.parse(body).longitude;
    callback(null, GeoCoor);
  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};
