const http = require("http");

const request = http.request(
  `http://api.weatherapi.com/v1/current.json?key=d7ef0e0c4ce0408892184422211909&q=cairo&aqi=yes`,
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
