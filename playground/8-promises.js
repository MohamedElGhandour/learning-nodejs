const doWorkPromises = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("it's Working");
    // reject("Things went wrong!");
  }, 2000);
});

doWorkPromises
  .then((data) => {
    console.log("Succes! ", data);
  })
  .catch((error) => {
    console.log("Error! ", error);
  });
