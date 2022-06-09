
const request = require("request");

//----------------------------------------------------------------------------------------

const fetchMyIP = function(callback1) {

  request("https://api.ipify.org/?format=json", (error, response, body) => {

    if (error) {
      callback1(error);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback1(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback1(null, ip);
  });
};

//----------------------------------------------------------------------------------------

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

    let geoCoor = {};
    geoCoor.latitude = JSON.parse(body).latitude;
    geoCoor.longitude = JSON.parse(body).longitude;
    callback(null, geoCoor);
  });
};


//----------------------------------------------------------------------------------------

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

    const AllflyOverTime = JSON.parse(body).response;
    callback(null, AllflyOverTime);
  });
};

//----------------------------------------------------------------------------------------

const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      })
    });
  });
}










module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
