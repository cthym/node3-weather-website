const request = require("request");
const forecast = (longtitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=ad50ea5d3590e8e7036685ce1612c20e&query=" +
    latitude +
    "," +
    longtitude +
    "&units=f";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("unable to connect to the weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". Its currently " +
          body.current.temperature +
          " degress out." +
          " it feels like " +
          body.current.feelslike +
          " degress out."
      );
    }
  });
};
module.exports = forecast;
