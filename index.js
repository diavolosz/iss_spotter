


const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');


fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, flyoverTime) => {

  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover time:', flyoverTime);
})


// fetchCoordsByIP("99.241.100.180", (error, GeoCoor) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned Geo coordiates:' , GeoCoor);
// });

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });