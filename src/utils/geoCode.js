const request = require("request");
const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiY2F0aHkwMyIsImEiOiJja25wbWVkeTIwMjI2Mm9vMG04c2c5ZHFkIn0.GY2qW2Eq4AaGoDmmNjo7oA&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to Connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find url. Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].text,
      });
    }
  });
};
module.exports = geoCode;
