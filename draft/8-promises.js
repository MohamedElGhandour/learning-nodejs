const add = (a, b) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });

add(5, 60)
  .then((sum) => {
    console.log(sum);
    return add(sum, 65);
  })
  .then((sum2) => {
    console.log(sum2);
  })
  .catch((e) => {
    console.log(e);
  });

// add(5, 60)
//   .then((sum) => {
//     console.log(sum);
//     add(sum, 65)
//       .then((sum2) => {
//         console.log(sum2);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// const doWorkPromises = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("it's Working");
//     // reject("Things went wrong!");
//   }, 2000);
// });

// doWorkPromises
//   .then((data) => {
//     console.log("Succes! ", data);
//   })
//   .catch((error) => {
//     console.log("Error! ", error);
//   });
