// setTimeout(() => {
//   console.log(`Two second are up`);
// }, 2000);

// const names = ["Mohamed", "ahmed", "aid", "amr", "sara"];

// const shortNames = names.filter((name) => name.length <= 4);

// console.log(shortNames);

// const geoCode = (address, callback) => {
//   setTimeout(() => {
//     const data = {
//       latitude: 0,
//       longitude: 0,
//     };
//     callback(data);
//   }, 2000);
// };

// const data = geoCode("cairo", (data) => {
//   console.log(data);
// });

// const add = (x, y, callback) => {
//   setTimeout(() => {
//     const sum = x + y;
//     callback(sum);
//   }, 2000);
// };

// add(1, 4, (sum) => {
//   console.log(sum); // Should print: 5
// });

// const geoCode = (address, callback) => {
//   setTimeout(() => {
//     const data = {
//       latitude: 0,
//       longitude: 0,
//     };
//     return data;
//   }, 2000);
// };

// const data = geoCode("cairo");

// console.log(data);

const doWorkCallback = (text, callback) => {
  setTimeout(() => {
    // callback(undefined, text);
    // callback("there is error", undefined);
  }, 2000);
};

doWorkCallback("Hi it's me", (error, text) => {
  if (error) {
    return console.log(error);
  }

  console.log(text);
});
