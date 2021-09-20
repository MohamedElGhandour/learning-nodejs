const http = require("http");
require("dotenv").config();

const access_token_WEATHER_API = process.env.WEATHER_API;

const request = http.request(
  `http://api.weatherapi.com/v1/current.json?key=${access_token_WEATHER_API}&q=cairo&aqi=yes`,
  (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      const body = JSON.parse(data);
      console.log(body);
    });
  }
);

request.on("error", (error) => {
  console.log("An Error: ", error);
});

request.end();
