const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibW9oYW1lZGVsZ2hhbmRvdXIxIiwiYSI6ImNrdHJuYzN1MzBxaWQydXFvNGxycGlmMXoifQ.zl_qTIO2qAjy44Hw7eJddA&limit=1`;
  request({ url, json: true }, (error, response) => {
    const { message, features } = response.body;
    if (error) {
      const callError = {
        msg: `Unable to connect to map service!`,
        error: error,
      };
      callback(callError, undefined);
    } else if (message) {
      callback({ msg: message }, undefined);
    } else if (features.length === 0) {
      callback({ msg: `Not Found` }, undefined);
    } else {
      const { center, place_name } = features[0];
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place_name,
      });
    }
  });
};

module.exports = geocode;
