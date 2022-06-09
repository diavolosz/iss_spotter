


const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

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