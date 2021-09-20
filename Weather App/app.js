const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];

address
  ? geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return console.log(error);
      }

      forecast({ latitude, longitude }, (forecastError, forecastResponse) => {
        if (forecastError) {
          return console.log(forecastError);
        }

        console.log(location);
        console.log(forecastResponse);
      });
    })
  : console.log("please provide an address");

// const request = require("request");
// const weatherStack =
//   "http://api.weatherstack.com/current?access_key=61fcdd847f2426be2a6f104a43d4750c&query=cairo";
// const openweathermap =
//   "https://api.openweathermap.org/data/2.5/weather?q=cairo&appid=4cad7b6a312b685d4e772422aa4db3e1";
// const weatherapi =
//   "http://api.weatherapi.com/v1/current.json?key=d7ef0e0c4ce04083892184422211909&q=cairo&aqi=yes";
// const mapbox =
//   "https://api.mapbox.com/geocoding/v5/mapbox.places/cairo.json?access_token=pk.eyJ1IjoibW9oYW1lZGVsZ2hhbmRvdXIxIiwiYSI6ImNrdHJuYzN1MzBxaWQydXFvNGxycGlmMXoifQ.zl_qTIO2qAjy44Hw7eJddA&limit=1";

// request({ url: weatherapi, json: true }, (err, res) => {
// const parsing = JSON.parse(res.body);
// console.log(parsing);
// console.log(res.body.current);
//   if (err) {
//     console.log(`Unable to connect to weather service!\n`, err);
//   } else if (res.body.error) {
//     console.log(res.body.error.message);
//   } else {
//     console.log(
//       `${res.body.current.condition.text}. It's currently ${res.body.current.temp_c} c degrees, It feels like ${res.body.current.feelslike_c} c degrees out`
//     );
//   }
// });

// request({ url: mapbox, json: true }, (err, res) => {
//   if (err) {
//     console.log(`Unable to connect to map service!\n`, err);
//   } else if (res.body.message) {
//     console.log(res.body.message);
//   } else if (res.body.features.length === 0) {
//     console.log(`Not Found`);
//   } else {
//     console.log(
//       `latitude: ${res.body.features[0].center[1]}, longitude: ${res.body.features[0].center[0]}`
//     );
//   }
// });

// const geocode = (address, callback) => {
//   const mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//     address
//   )}.json?access_token=pk.eyJ1IjoibW9oYW1lZGVsZ2hhbmRvdXIxIiwiYSI6ImNrdHJuYzN1MzBxaWQydXFvNGxycGlmMXoifQ.zl_qTIO2qAjy44Hw7eJddA&limit=1`;
//   request({ url: mapbox, json: true }, (error, response) => {
//     if (error) {
//       const callError = {
//         msg: `Unable to connect to map service!\n`,
//         error: error,
//       };
//       callback(callError, undefined);
//     } else if (response.body.message) {
//       callback({ msg: response.body.message }, undefined);
//     } else if (response.body.features.length === 0) {
//       callback({ msg: `Not Found` }, undefined);
//     } else {
//       callback(undefined, {
//         latitude: response.body.features[0].center[1],
//         longitude: response.body.features[0].center[0],
//         location: response.body.features[0].place_name,
//       });
//     }
//   });
// };

// console.log("starting app");

// setTimeout(() => {
//   console.log("after two second");
// }, 2000);

// setTimeout(() => {
//   console.log("after zero second");
// }, 0);

// console.log("Ending app");
