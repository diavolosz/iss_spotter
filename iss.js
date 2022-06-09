



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

// { latitude: '49.27670', longitude: '-123.13000' }


const fetchISSFlyOverTimes = function(geoCoor, callback) {
  
  let url = `https://iss-pass.herokuapp.com/json/?lat=${geoCoor.latitude}&lon=${geoCoor.longitude}`;

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

    let data = JSON.parse(body).response;

    for (let flyover of data) {
      let flyoverTime = {};
      flyoverTime.risetime = flyover.risetime;
      flyoverTime.duration = flyover.duration;
      callback(null, flyoverTime);
    }
  });
};











module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes
};
